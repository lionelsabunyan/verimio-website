"use client";

import FormStep from "../FormStep";
import FormInput from "../ui/FormInput";
import type { FormData } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step4Contact({ formData, errors, updateField }: Props) {
  return (
    <FormStep
      title="Nereye gönderelim?"
      description="Raporunuzu veya görüşme davetinizi bu adrese göndereceğiz."
    >
      <FormInput
        label="E-posta adresi"
        type="email"
        value={formData.email}
        onChange={(v) => updateField("email", v)}
        error={errors.email}
        placeholder="ornek@firma.com"
        required
      />

      <FormInput
        label="Telefon numarası"
        type="tel"
        value={formData.phone}
        onChange={(v) => updateField("phone", v)}
        placeholder="+90 5xx xxx xx xx"
        optional
      />
    </FormStep>
  );
}
