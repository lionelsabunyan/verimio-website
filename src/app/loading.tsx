export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center gap-6">
        {/* Animated V monogram */}
        <svg
          viewBox="0 0 64 64"
          width={56}
          height={56}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Yükleniyor"
        >
          <style>{`
            @keyframes draw-v {
              0% { stroke-dashoffset: 120; opacity: 0.3; }
              50% { stroke-dashoffset: 0; opacity: 1; }
              100% { stroke-dashoffset: 120; opacity: 0.3; }
            }
            @keyframes pulse-dot {
              0%, 100% { opacity: 0.3; r: 5; }
              50% { opacity: 1; r: 7; }
            }
            .v-path { animation: draw-v 1.8s ease-in-out infinite; }
            .v-dot { animation: pulse-dot 1.8s ease-in-out infinite; }
          `}</style>
          <path
            className="v-path"
            d="M8 12 L32 52 L56 12"
            stroke="#8B5CF6"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120"
            strokeDashoffset="120"
          />
          <circle className="v-dot" cx="32" cy="9" r="5" fill="#A3E635" />
        </svg>

        {/* Wordmark */}
        <div className="flex items-center gap-0" style={{ letterSpacing: '-0.02em' }}>
          <span className="text-lg font-bold text-foreground">verim</span>
          <span className="text-lg font-bold text-secondary">io</span>
        </div>
      </div>
    </div>
  );
}
