"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NAV_LINKS, BRAND } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <nav
      aria-label="Ana navigasyon"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo — text only */}
        <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
          verimio
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-[13px] text-foreground-secondary hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link
          href={BRAND.checkupUrl}
          className="hidden md:inline-flex items-center px-5 py-2 bg-foreground text-background text-[13px] font-medium hover:opacity-90 transition-opacity"
        >
          Check-Up Başlatın
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="6" x2="17" y2="6" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu — fullscreen overlay, chatbot bubble üstünde (z-[60]) */}
      {isOpen && (
        <div className="md:hidden fixed left-0 right-0 top-16 bottom-0 bg-background border-t border-border z-[60] overflow-y-auto">
          <div className="px-6 py-6 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2.5 text-sm text-foreground-secondary hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href={BRAND.checkupUrl}
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-5 py-2.5 bg-foreground text-background text-sm font-medium"
              >
                Check-Up Başlatın
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
