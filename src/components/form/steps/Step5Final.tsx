"use client";

import FormStep from "../FormStep";
import RadioGroup from "../ui/RadioGroup";
import Textarea from "../ui/Textarea";
import type { FormData } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
}

const AI_OPTIONS = [
  "Hiç kullanmadık",
  "ChatGPT gibi araçları denedik",
  "Bazı işlerde kullanıyoruz",
  "İleri seviye kullanıcıyız",
];

const CALL_OPTIONS = [
  "Evet, görüşmek isterim",
  "Hayır, rapor yeterli",
];

export default function Step5Final({ formData, errors, updateField }: Props) {
  return (
    <FormStep
      title="Son birkaç soru"
      description="Bunları da yanıtladığınızda raporunuzu göndermeye hazırız."
    >
      <Textarea
        label="İş süreçlerinizde sizi en çok zorlayan şey nedir?"
        value={formData.biggestPain}
        onChange={(v) => updateField("biggestPain", v)}
        error={errors.biggestPain}
        placeholder="Örn: Müşteri sorularına yetişemiyoruz, raporlar çok zaman alıyor..."
        maxLength={300}
        required
      />

      <RadioGroup
        label="Şu an yapay zeka araçları kullanıyor musunuz?"
        options={AI_OPTIONS}
        value={formData.aiExperience}
        onChange={(v) => updateField("aiExperience", v)}
        error={errors.aiExperience}
        layout="grid"
        columns={2}
      />

      <RadioGroup
        label="Raporunuzun ardından 30 dakikalık ücretsiz danışmanlık görüşmesi ister misiniz?"
        options={CALL_OPTIONS}
        value={formData.wantsCall}
        onChange={(v) => updateField("wantsCall", v)}
        error={errors.wantsCall}
      />
    </FormStep>
  );
}
