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
      <div className="border border-border p-5 space-y-3">
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <span className="text-xs text-foreground-muted tracking-wide uppercase">Şirket</span>
          <span className="text-sm text-foreground">{formData.companyName}</span>
        </div>
        <div className="flex items-baseline justify-between border-b border-border pb-3">
          <span className="text-xs text-foreground-muted tracking-wide uppercase">E-posta</span>
          <span className="text-sm text-foreground">{formData.email}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-foreground-muted tracking-wide uppercase">Telefon</span>
          <span className="text-sm text-foreground">{formData.phone}</span>
        </div>
      </div>
    </FormStep>
  );
}
