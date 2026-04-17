"use client";

import { useEffect, useRef, useState } from "react";

interface InlineVideoProps {
  src: string;
  poster?: string;
  caption?: string;
  autoplay?: boolean;
}

export default function InlineVideo({
  src,
  poster,
  caption,
  autoplay = true,
}: InlineVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => setStarted(true)).catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [autoplay]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setStarted(true);
    } else {
      video.pause();
    }
  };

  return (
    <figure ref={containerRef} className="my-10">
      <div className="relative group border border-border bg-black/[0.02]">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          onClick={handleClick}
          className="w-full h-auto block cursor-pointer"
          aria-label={caption || "Verimio video"}
        />
        {started && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Sesi aç" : "Sesi kapat"}
            className="absolute bottom-3 right-3 bg-foreground/90 text-background text-xs uppercase tracking-[0.2em] px-3 py-1.5 hover:bg-foreground transition-colors"
          >
            {muted ? "Ses Aç" : "Ses Kapat"}
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-foreground-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
