"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import type { FormData, Sector } from "@/lib/form-data";
import { INITIAL_FORM_DATA } from "@/lib/form-data";
import { validateStep } from "@/lib/form-validation";
import Button from "@/components/ui/Button";
import StepIndicator from "./StepIndicator";
import Step1Basic from "./steps/Step1Basic";
import Step2Company from "./steps/Step2Company";
import Step3Process from "./steps/Step3Process";
import Step4Hours from "./steps/Step4Hours";
import Step5Final from "./steps/Step5Final";

const TOTAL_STEPS = 5;

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
      s9: "",
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

  const buildSupabasePayload = (data: FormData) => {
    const hoursMap: Record<string, number> = {
      "0-2 saat": 1,
      "3-5 saat": 4,
      "6-10 saat": 8,
      "10+ saat": 12,
    };
    return {
      email: data.email,
      phone: data.phone || null,
      sector: data.sector,
      team_size: data.teamSize,
      tools: data.tools,
      pain_points: {
        s6: data.s6,
        s7: data.s7,
        ...(data.sector !== "Diğer" && { s8: data.s8, s9: data.s9 }),
      },
      hours_data_entry: hoursMap[data.hoursDataEntry] ?? 0,
      hours_reporting: hoursMap[data.hoursReporting] ?? 0,
      hours_customer_comm: hoursMap[data.hoursCustomer] ?? 0,
      hours_content: hoursMap[data.hoursContent] ?? 0,
      hours_file_mgmt: hoursMap[data.hoursFiles] ?? 0,
      biggest_pain: data.biggestPain,
      ai_experience: data.aiExperience,
      wants_call: data.wantsCall === "Evet, görüşmek isterim",
      status: "new",
    };
  };

  const handleSubmit = async () => {
    const validationErrors = validateStep(5, formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const supabasePayload = buildSupabasePayload(formData);
      // FAZ 6'da Supabase + n8n entegrasyonu yapılacak
      console.log("Supabase payload:", supabasePayload);
      console.log("n8n webhook payload:", formData);

      // Simulate async (FAZ 6'da gerçek API çağrısı olacak)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      router.push("/tesekkurler");
    } catch {
      setSubmitError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsSubmitting(false);
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
          <h3 className="text-lg font-semibold text-primary">
            Analiziniz hazırlanıyor...
          </h3>
          <p className="text-sm text-muted mt-1">
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
            className="text-xs text-muted/60"
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
              <Step1Basic formData={formData} errors={errors} updateField={updateField} />
            )}
            {currentStep === 2 && (
              <Step2Company
                formData={formData}
                errors={errors}
                updateField={updateField}
                onSectorChange={handleSectorChange}
              />
            )}
            {currentStep === 3 && (
              <Step3Process formData={formData} errors={errors} updateField={updateField} />
            )}
            {currentStep === 4 && (
              <Step4Hours formData={formData} errors={errors} updateField={updateField} />
            )}
            {currentStep === 5 && (
              <Step5Final formData={formData} errors={errors} updateField={updateField} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-500 text-center">{submitError}</p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        {currentStep > 1 ? (
          <motion.button
            type="button"
            onClick={goBack}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-muted hover:text-foreground transition-colors rounded-xl hover:bg-foreground/5"
          >
            <ChevronLeft className="w-4 h-4" />
            Geri
          </motion.button>
        ) : (
          <div />
        )}

        {currentStep < TOTAL_STEPS ? (
          <Button variant="secondary" size="md" onClick={goNext}>
            Devam Et
          </Button>
        ) : (
          <Button variant="primary" size="md" onClick={handleSubmit} icon={false}>
            Ücretsiz Raporumu Al →
          </Button>
        )}
      </div>
    </div>
  );
}
