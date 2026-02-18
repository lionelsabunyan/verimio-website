import { CheckCircle, Clock, FileText, PhoneOff } from "lucide-react";

const badges = [
  { icon: CheckCircle, text: "Tamamen Ücretsiz" },
  { icon: Clock, text: "3 Dakikada Tamamla" },
  { icon: FileText, text: "Anında PDF Rapor" },
  { icon: PhoneOff, text: "Satış Araması Yok" },
];

export default function TrustBadges() {
  return (
    <section className="py-6 border-y border-foreground/6 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <span className="text-sm text-muted font-medium hidden sm:block">
            Neden Verimio?
          </span>
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-foreground/70"
              >
                <Icon className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="font-medium">{badge.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
