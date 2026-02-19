import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FloatingShapes, RadialGlow } from "@/components/brand/Decoratives";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decoratives */}
      <RadialGlow color="lime" size={400} opacity={0.07} className="top-1/4 -right-20" />
      <RadialGlow color="purple" size={350} opacity={0.06} className="bottom-1/4 -left-20" />
      <FloatingShapes count={6} />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-lg mx-auto">
        {/* 404 SVG */}
        <div className="flex justify-center mb-8">
          <svg
            viewBox="0 0 300 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-64 sm:w-80"
            aria-hidden="true"
          >
            {/* "4" left */}
            <g stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55">
              <line x1="22" y1="20" x2="22" y2="90" />
              <line x1="22" y1="60" x2="60" y2="20" />
              <line x1="60" y1="20" x2="60" y2="90" />
              <line x1="10" y1="60" x2="68" y2="60" />
            </g>

            {/* "0" center — with V monogram inside */}
            <ellipse cx="150" cy="55" rx="36" ry="45" stroke="#8B5CF6" strokeWidth="6" strokeOpacity="0.55" />
            {/* V monogram inside the 0 */}
            <g opacity="0.75">
              <path d="M 134 35 L 150 68 L 166 35"
                stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="150" cy="31" r="4" fill="#A3E635" />
            </g>

            {/* "4" right */}
            <g stroke="#8B5CF6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.55">
              <line x1="218" y1="20" x2="218" y2="90" />
              <line x1="218" y1="60" x2="256" y2="20" />
              <line x1="256" y1="20" x2="256" y2="90" />
              <line x1="206" y1="60" x2="264" y2="60" />
            </g>
          </svg>
        </div>

        {/* Text */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
          <span className="text-xs font-semibold text-foreground-secondary tracking-widest uppercase ml-1">Sayfa Bulunamadı</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Bu sayfa yok. Ama doğru{" "}
          <span className="gradient-text">analiz olsa bulurduk.</span>
        </h1>

        <p className="text-foreground-secondary leading-relaxed mb-8">
          Aradığınız sayfa taşınmış ya da kaldırılmış olabilir.
          Ana sayfadan devam edebilirsiniz.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary text-primary font-semibold rounded-full hover:bg-secondary-hover transition-all duration-200 hover:shadow-lg hover:shadow-secondary/25 text-sm"
        >
          Ana Sayfaya Dön
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
