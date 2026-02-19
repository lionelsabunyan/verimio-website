import type { FormData } from "./form-data";

type ValidationErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(step: number, data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 1) {
    if (!data.sector) errors.sector = "Lütfen sektörünüzü seçin";
    if (!data.companyName.trim()) errors.companyName = "Şirket adı zorunludur";
    if (!data.teamSize) errors.teamSize = "Lütfen ekip büyüklüğünüzü seçin";
  }

  if (step === 2) {
    if (!data.s6) errors.s6 = "Lütfen bir seçenek işaretleyin";
    if (!data.s7) errors.s7 = "Lütfen bir seçenek işaretleyin";
    if (data.sector !== "Diğer" && !data.s8) {
      errors.s8 = "Lütfen bir seçenek işaretleyin";
    }
    if (data.tools.length === 0) errors.tools = "En az bir araç seçin";
  }

  if (step === 3) {
    if (!data.biggestPain.trim()) {
      errors.biggestPain = "Bu alan zorunludur";
    } else if (data.biggestPain.trim().length < 10) {
      errors.biggestPain = "En az 10 karakter yazın";
    }
    if (!data.priorityArea) errors.priorityArea = "Lütfen bir alan seçin";
    if (!data.expectation) errors.expectation = "Lütfen bir seçenek işaretleyin";
    if (!data.timeline) errors.timeline = "Lütfen bir seçenek işaretleyin";
  }

  if (step === 4) {
    if (!data.email.trim()) {
      errors.email = "E-posta adresi zorunludur";
    } else if (!EMAIL_REGEX.test(data.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }
  }

  return errors;
}
