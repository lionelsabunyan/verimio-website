import type { FormData } from "./form-data";

type ValidationErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateStep(step: number, data: FormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (step === 1) {
    if (!data.email.trim()) {
      errors.email = "E-posta adresi zorunludur";
    } else if (!EMAIL_REGEX.test(data.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }
  }

  if (step === 2) {
    if (!data.sector) errors.sector = "Lütfen sektörünüzü seçin";
    if (!data.teamSize) errors.teamSize = "Lütfen ekip büyüklüğünüzü seçin";
    if (data.tools.length === 0) errors.tools = "En az bir araç seçin";
  }

  if (step === 3) {
    if (!data.s6) errors.s6 = "Lütfen bir seçenek işaretleyin";
    if (!data.s7) errors.s7 = "Lütfen bir seçenek işaretleyin";
    if (data.sector !== "Diğer") {
      if (!data.s8) errors.s8 = "Lütfen bir seçenek işaretleyin";
      if (!data.s9) errors.s9 = "Lütfen bir seçenek işaretleyin";
    }
  }

  if (step === 4) {
    if (!data.hoursDataEntry) errors.hoursDataEntry = "Zorunlu";
    if (!data.hoursReporting) errors.hoursReporting = "Zorunlu";
    if (!data.hoursCustomer) errors.hoursCustomer = "Zorunlu";
    if (!data.hoursContent) errors.hoursContent = "Zorunlu";
    if (!data.hoursFiles) errors.hoursFiles = "Zorunlu";
  }

  if (step === 5) {
    if (!data.biggestPain.trim()) {
      errors.biggestPain = "Bu alan zorunludur";
    } else if (data.biggestPain.trim().length < 10) {
      errors.biggestPain = "En az 10 karakter yazın";
    }
    if (!data.aiExperience) errors.aiExperience = "Lütfen bir seçenek işaretleyin";
    if (!data.wantsCall) errors.wantsCall = "Lütfen bir seçenek işaretleyin";
  }

  return errors;
}
