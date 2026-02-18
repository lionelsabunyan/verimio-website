"use client";

import FormStep from "../FormStep";
import FormInput from "../ui/FormInput";
import type { FormData } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step1Basic({ formData, errors, updateField }: Props) {
  return (
    <FormStep
      title="Sizi tanıyalım"
      description="Raporunuzu göndereceğimiz e-posta adresinizi girin."
    >
      <FormInput
        label="İş e-postanız"
        type="email"
        value={formData.email}
        onChange={(v) => updateField("email", v)}
        error={errors.email}
        placeholder="ornek@sirket.com"
        required
      />
      <FormInput
        label="Telefon numaranız"
        type="tel"
        value={formData.phone}
        onChange={(v) => updateField("phone", v)}
        placeholder="+90 5XX XXX XX XX"
        optional
      />
    </FormStep>
  );
}
