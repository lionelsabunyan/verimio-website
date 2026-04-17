"use client";

import FormStep from "../FormStep";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/CheckboxGroup";
import type { FormData, Sector } from "@/lib/form-data";
import { SECTOR_QUESTIONS, SECTOR_QUESTION_LABELS, TOOLS_OPTIONS } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step2Questions({ formData, errors, updateField }: Props) {
  const sector = formData.sector as Sector;
  const questions = SECTOR_QUESTIONS[sector];
  const labels = SECTOR_QUESTION_LABELS[sector];

  return (
    <FormStep
      title="İş süreçleriniz"
      description="Mevcut durumunuzu anlayabilmemiz için aşağıdaki soruları yanıtlayın."
    >
      <RadioGroup
        label={labels.s6}
        options={questions.s6}
        value={formData.s6}
        onChange={(v) => updateField("s6", v)}
        error={errors.s6}
      />

      <RadioGroup
        label={labels.s7}
        options={questions.s7}
        value={formData.s7}
        onChange={(v) => updateField("s7", v)}
        error={errors.s7}
      />

      {questions.s8.length > 0 && (
        <CheckboxGroup
          label={labels.s8}
          hint="En fazla 3 alan seçebilirsiniz"
          options={questions.s8}
          values={formData.s8}
          onChange={(v) => updateField("s8", v)}
          error={errors.s8}
          maxSelections={3}
        />
      )}

      {questions.s9.length > 0 && (
        <RadioGroup
          label={labels.s9}
          options={questions.s9}
          value={formData.s9}
          onChange={(v) => updateField("s9", v)}
          error={errors.s9}
        />
      )}

      <CheckboxGroup
        label="Şu an hangi araçları kullanıyorsunuz? (birden fazla seçebilirsiniz)"
        options={TOOLS_OPTIONS}
        values={formData.tools}
        onChange={(v) => updateField("tools", v)}
        error={errors.tools}
        columns={2}
      />
    </FormStep>
  );
}
