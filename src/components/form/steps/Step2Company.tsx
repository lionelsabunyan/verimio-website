"use client";

import { ShoppingCart, Megaphone, Briefcase, Factory, Code2, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import FormStep from "../FormStep";
import RadioGroup from "../ui/RadioGroup";
import CheckboxGroup from "../ui/CheckboxGroup";
import type { FormData, Sector } from "@/lib/form-data";

interface Props {
  formData: FormData;
  errors: Partial<Record<keyof FormData, string>>;
  updateField: (key: keyof FormData, value: string | string[]) => void;
  onSectorChange: (sector: Sector) => void;
}

const SECTORS: { label: Sector; icon: React.ElementType }[] = [
  { label: "E-ticaret / Perakende", icon: ShoppingCart },
  { label: "Ajans (Reklam / Dijital / Kreatif)", icon: Megaphone },
  { label: "B2B Hizmet (Danışmanlık / Muhasebe / Hukuk)", icon: Briefcase },
  { label: "Üretim / Lojistik", icon: Factory },
  { label: "Teknoloji / Yazılım", icon: Code2 },
  { label: "Diğer", icon: MoreHorizontal },
];

const TEAM_SIZES = ["Sadece ben", "2-10 kişi", "11-50 kişi", "50+ kişi"];

const TOOLS = [
  "Excel / Google Sheets",
  "CRM (Salesforce, HubSpot vb.)",
  "Proje yönetimi (Asana, Trello vb.)",
  "E-ticaret platformu (Trendyol, Shopify vb.)",
  "Muhasebe yazılımı",
  "Özel yazılım / ERP",
  "Hiçbiri",
];

export default function Step2Company({ formData, errors, updateField, onSectorChange }: Props) {
  return (
    <FormStep
      title="Şirketiniz hakkında"
      description="Sektörünüze özel analiz yapabilmemiz için birkaç bilgiye ihtiyacımız var."
    >
      {/* Sektör */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-foreground/80">
          Şirketiniz hangi sektörde faaliyet gösteriyor?
          <span className="ml-0.5 text-primary-light">*</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SECTORS.map(({ label, icon: Icon }) => {
            const selected = formData.sector === label;
            return (
              <motion.button
                key={label}
                type="button"
                onClick={() => onSectorChange(label)}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm text-left transition-colors duration-150 ${
                  selected
                    ? "bg-primary/8 border-primary/40 text-primary font-medium"
                    : "border-foreground/15 text-foreground/70 hover:border-primary/20 hover:bg-primary/3"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                  selected ? "bg-primary text-white" : "bg-foreground/8 text-muted"
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {label}
              </motion.button>
            );
          })}
        </div>
        {errors.sector && <p className="text-xs text-red-500">{errors.sector}</p>}
      </div>

      {/* Ekip büyüklüğü */}
      <RadioGroup
        label="Kaç kişilik bir ekiple çalışıyorsunuz?"
        options={TEAM_SIZES}
        value={formData.teamSize}
        onChange={(v) => updateField("teamSize", v)}
        error={errors.teamSize}
        layout="grid"
        columns={2}
      />

      {/* Araçlar */}
      <CheckboxGroup
        label="Şu an hangi araçları kullanıyorsunuz? (Birden fazla seçebilirsiniz)"
        options={TOOLS}
        values={formData.tools}
        onChange={(v) => updateField("tools", v)}
        error={errors.tools}
        columns={2}
      />
    </FormStep>
  );
}
