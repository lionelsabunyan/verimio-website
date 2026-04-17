import { HOW_IT_WORKS } from "@/lib/constants";

export default function Process() {
  return (
    <section id="nasil-calisir" className="py-24 md:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <p className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase mb-4">
          Süreç
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-16 max-w-2xl">
          Beş adım, hepsi önceden belli
        </h2>

        <div className="space-y-12 md:space-y-16">
          {HOW_IT_WORKS.map((step, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
              {/* Number */}
              <div className="md:col-span-1">
                <span aria-hidden="true" className="text-5xl md:text-6xl font-bold text-[#8F8F8F]">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <div className="md:col-span-5">
                <h3 className="text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
