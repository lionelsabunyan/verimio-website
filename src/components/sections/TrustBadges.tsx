import { TRUST_BADGES } from "@/lib/constants";

export default function TrustBadges() {
  return (
    <section className="py-8 border-y border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <span className="text-sm text-muted font-medium">
            Firmaların Güvendiği Çözüm
          </span>
          {TRUST_BADGES.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-foreground/70"
            >
              <span className="text-base">{badge.icon}</span>
              <span className="font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
