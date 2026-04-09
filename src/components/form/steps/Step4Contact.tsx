"use client";

import FormStep from "../FormStep";
import type { FormData } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step4Contact({ formData }: Props) {
  return (
    <FormStep
      title="Raporunuz hazır!"
      description={`${formData.companyName || 'Şirketiniz'} için analiz sonuçlarınızı ${formData.email} adresine göndereceğiz.`}
    >
      <div className="rounded-xl bg-foreground/4 border border-border p-4 space-y-2">
        <p className="text-sm text-foreground-secondary">
          <span className="font-medium text-foreground">Şirket:</span> {formData.companyName}
        </p>
        <p className="text-sm text-foreground-secondary">
          <span className="font-medium text-foreground">E-posta:</span> {formData.email}
        </p>
        <p className="text-sm text-foreground-secondary">
          <span className="font-medium text-foreground">Telefon:</span> {formData.phone}
        </p>
      </div>
    </FormStep>
  );
}
