"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Mail, Calendar } from "lucide-react";

import type { FormData, Sector } from "@/lib/form-data";
import { INITIAL_FORM_DATA } from "@/lib/form-data";
import { validateStep } from "@/lib/form-validation";
import { BRAND } from "@/lib/constants";
import StepIndicator from "./StepIndicator";
import Step1Sector from "./steps/Step1Sector";
import Step2Questions from "./steps/Step2Questions";
import Step3Goals from "./steps/Step3Goals";
import Step4Contact from "./steps/Step4Contact";

const TOTAL_STEPS = 4;

const LOADING_MESSAGES = [
  "Sektör profili oluşturuluyor...",
  "AI analizi çalıştırılıyor...",
  "Rapor hazırlanıyor...",
  "Son dokunuşlar yapılıyor...",
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const stepTransition = {
  duration: 0.35,
  ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
};

export default function MultiStepForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  useEffect(() => {
    if (!isSubmitting) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  const updateField = (key: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSectorChange = (sector: Sector) => {
    setFormData((prev) => ({
      ...prev,
      sector,
      s6: "",
      s7: "",
      s8: "",
    }));
    if (errors.sector) setErrors((prev) => ({ ...prev, sector: undefined }));
  };

  const goNext = () => {
    const validationErrors = validateStep(currentStep, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setErrors({});
    setDirection(-1);
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buildPayload = (data: FormData) => ({
    email: data.email,
    phone: data.phone || null,
    company_name: data.companyName,
    company_website: data.companyWebsite || null,
    sector: data.sector,
    team_size: data.teamSize,
    tools: data.tools,
    pain_points: {
      s6: data.s6,
      s7: data.s7,
      ...(data.sector !== "Diğer" && { s8: data.s8 }),
    },
    biggest_pain: data.biggestPain,
    priority_area: data.priorityArea,
    expectation: data.expectation,
    timeline: data.timeline,
    status: "new",
  });

  const handleSubmitReport = async () => {
    const validationErrors = validateStep(TOTAL_STEPS, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = buildPayload(formData);
      // FAZ 6'da Supabase + n8n entegrasyonu yapılacak
      console.log("Payload:", payload);

      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.push("/tesekkurler?tip=rapor");
    } catch {
      setSubmitError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
    }
  };

  const handleBookMeeting = async () => {
    const validationErrors = validateStep(TOTAL_STEPS, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Cal.com URL kurulumdan sonra dolu olacak
    if (BRAND.calendlyUrl && BRAND.calendlyUrl !== "#") {
      window.open(BRAND.calendlyUrl, "_blank");
      router.push("/tesekkurler?tip=gorusme");
    } else {
      // Cal.com henüz kurulmamış → rapor akışına düş
      await handleSubmitReport();
    }
  };

  // Loading screen
  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-secondary/20 border-t-secondary"
        />
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-primary-light">
            Analiziniz hazırlanıyor...
          </h3>
          <p className="text-sm text-foreground-secondary mt-1">
            Cevaplarınız işleniyor. Birkaç saniye sürebilir.
          </p>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={loadingMessageIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-foreground-muted"
          >
            {LOADING_MESSAGES[loadingMessageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

      {/* Step Content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={stepTransition}
          >
            {currentStep === 1 && (
              <Step1Sector
                formData={formData}
                errors={errors}
                updateField={updateField}
                onSectorChange={handleSectorChange}
              />
            )}
            {currentStep === 2 && (
              <Step2Questions
                formData={formData}
                errors={errors}
                updateField={updateField}
              />
            )}
            {currentStep === 3 && (
              <Step3Goals
                formData={formData}
                errors={errors}
                updateField={updateField}
              />
            )}
            {currentStep === 4 && (
              <Step4Contact
                formData={formData}
                errors={errors}
                updateField={updateField}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-500 text-center">{submitError}</p>
      )}

      {/* Navigation */}
      {currentStep < TOTAL_STEPS ? (
        <div className="flex items-center justify-between pt-2">
          {currentStep > 1 ? (
            <motion.button
              type="button"
              onClick={goBack}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors rounded-xl hover:bg-foreground/5"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </motion.button>
          ) : (
            <div />
          )}
          <motion.button
            type="button"
            onClick={goNext}
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-full bg-primary text-white hover:bg-primary/90 shadow-sm"
          >
            Devam Et
          </motion.button>
        </div>
      ) : (
        /* Step 4 — Dual CTA */
        <div className="space-y-3 pt-2">
          {currentStep > 1 && (
            <motion.button
              type="button"
              onClick={goBack}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors rounded-xl hover:bg-foreground/5 mb-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </motion.button>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option A: Get Report */}
            <motion.button
              type="button"
              onClick={handleSubmitReport}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 border-secondary bg-secondary/8 hover:bg-secondary/15 transition-colors duration-150 text-center"
            >
              <Mail className="w-5 h-5 text-secondary" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Detaylı Raporumu Gönder
                </p>
                <p className="text-xs text-foreground-secondary mt-0.5">
                  Hemen hazırlanır, e-postanıza iletilir
                </p>
              </div>
            </motion.button>

            {/* Option B: Book Meeting */}
            <motion.button
              type="button"
              onClick={handleBookMeeting}
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
              className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 border-primary bg-primary hover:bg-primary/90 transition-colors duration-150 text-center shadow-sm"
            >
              <Calendar className="w-5 h-5 text-white" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Ücretsiz Görüşme Planla
                </p>
                <p className="text-xs text-white/70 mt-0.5">
                  20 dakika · Zoom · Hemen rezerve et
                </p>
              </div>
            </motion.button>
          </div>

          <p className="text-xs text-foreground-muted text-center pt-1">
            İkisi de tamamen ücretsiz · Satış baskısı yok
          </p>
        </div>
      )}
    </div>
  );
}
