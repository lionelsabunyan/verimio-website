"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><polyline points="15,18 9,12 15,6"/></svg>
);
const Mail = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
);
const Calendar = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);

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
    }, 2500);
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
      s8: [],
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
      s8: data.s8,
      s9: data.s9,
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
      const res = await fetch("/api/checkup/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("submit failed");
      const data = await res.json();
      // Te\u015fekk\u00fcr sayfas\u0131 raporu an\u0131nda g\u00f6sterebilsin diye localStorage'a koy
      if (data.analysis && typeof window !== "undefined") {
        try {
          window.sessionStorage.setItem(
            "verimio_last_report",
            JSON.stringify({
              companyName: formData.companyName,
              email: formData.email,
              sector: formData.sector,
              analysis: data.analysis,
              timestamp: Date.now(),
            })
          );
        } catch {
          // sessionStorage yoksa sessizce ge\u00e7
        }
      }
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

    window.open(BRAND.calendlyUrl, "_blank");
    router.push("/tesekkurler?tip=gorusme");
  };

  // Loading screen
  if (isSubmitting) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 rounded-full border-2 border-border border-t-foreground"
        />
        <div>
          <h3 className="text-lg font-medium text-foreground">
            Analiziniz hazırlanıyor
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
        <div className="flex items-center justify-between pt-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>
          ) : (
            <div />
          )}
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Devam Et
          </button>
        </div>
      ) : (
        /* Step 4 — Dual CTA */
        <div className="space-y-4 pt-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Geri
            </button>
          )}

          <p className="text-sm text-foreground-secondary border-t border-border pt-4">
            Bilgilerinizi aldık — raporunuzu nasıl iletmemizi istersiniz?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Option A: Get Report — birincil */}
            <button
              type="button"
              onClick={handleSubmitReport}
              disabled={isSubmitting}
              className="flex flex-col items-start gap-2 px-5 py-5 border border-foreground bg-foreground hover:opacity-90 transition-opacity duration-150 text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="w-5 h-5 text-background" />
              <div>
                <p className="text-sm font-medium text-background">
                  Detaylı Raporumu Gönder
                </p>
                <p className="text-xs text-background/70 mt-0.5">
                  Hemen hazırlanır, e-postanıza iletilir
                </p>
              </div>
            </button>

            {/* Option B: Book Meeting — ikincil */}
            <button
              type="button"
              onClick={handleBookMeeting}
              disabled={isSubmitting}
              className="flex flex-col items-start gap-2 px-5 py-5 border border-border bg-background hover:border-foreground transition-colors duration-150 text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calendar className="w-5 h-5 text-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Ücretsiz Görüşme Planla
                </p>
                <p className="text-xs text-foreground-secondary mt-0.5">
                  20 dakika · Zoom · Hemen rezerve et
                </p>
              </div>
            </button>
          </div>

          <p className="text-xs text-foreground-muted pt-1">
            İkisi de tamamen ücretsiz · Satış baskısı yok
          </p>
        </div>
      )}
    </div>
  );
}
