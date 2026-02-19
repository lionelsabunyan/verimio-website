"use client";

import FormStep from "../FormStep";
import RadioGroup from "../ui/RadioGroup";
import Textarea from "../ui/Textarea";
import type { FormData } from "@/lib/form-data";
import {
  PRIORITY_AREA_OPTIONS,
  EXPECTATION_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

export default function Step3Goals({ formData, errors, updateField }: Props) {
  return (
    <FormStep
      title="Öncelikleriniz"
      description="Hedeflerinizi ve beklentinizi öğrenelim — raporunuzu buna göre şekillendireceğiz."
    >
      <Textarea
        label="İş süreçlerinizde sizi en çok zorlayan şey nedir?"
        value={formData.biggestPain}
        onChange={(v) => updateField("biggestPain", v)}
        error={errors.biggestPain}
        placeholder="Örn: Müşteri sorularına yetişemiyoruz, her rapor için saatlerce Excel'le uğraşıyoruz, ekip koordinasyonu çok zor..."
        maxLength={500}
        required
      />

      <RadioGroup
        label="Hangi alanda destek almak istersiniz?"
        options={[...PRIORITY_AREA_OPTIONS]}
        value={formData.priorityArea}
        onChange={(v) => updateField("priorityArea", v)}
        error={errors.priorityArea}
      />

      <RadioGroup
        label="Rapordan sonra ne bekliyorsunuz?"
        options={[...EXPECTATION_OPTIONS]}
        value={formData.expectation}
        onChange={(v) => updateField("expectation", v)}
        error={errors.expectation}
      />

      <RadioGroup
        label="Çözüm için zaman planınız nedir?"
        options={[...TIMELINE_OPTIONS]}
        value={formData.timeline}
        onChange={(v) => updateField("timeline", v)}
        error={errors.timeline}
      />
    </FormStep>
  );
}
