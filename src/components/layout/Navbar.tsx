"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import Logo from "@/components/brand/Logo";

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
    <motion.nav
      aria-label="Ana navigasyon"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      {/* Floating pill navbar */}
      <div
        className={`flex items-center justify-between w-full max-w-5xl transition-all duration-500 rounded-full px-5 py-2.5 ${
          scrolled
            ? "bg-[#1E0A46]/95 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30"
            : "bg-white/5 backdrop-blur-sm border border-white/5"
        }`}
      >
        {/* Logo */}
        <Logo variant="wordmark" size="sm" className="text-white" />

        {/* Desktop nav links — centered */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.filter(l => l.href !== "/").map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative px-3 py-1.5 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <Link
            href={BRAND.tallyFormUrl}
            className="hidden md:inline-flex items-center px-4 py-1.5 bg-secondary text-[#1E0A46] font-semibold text-[13px] rounded-full hover:bg-secondary-hover transition-colors duration-200"
          >
            Check-Up Başlatın
          </Link>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            whileTap={{ scale: 0.92 }}
            aria-label={isOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu — drops below pill */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:hidden absolute top-full mt-2 left-4 right-4 bg-[#0A0514]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/30"
          >
            <div className="px-4 py-4 space-y-0.5">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.04, duration: 0.2 }}
                className="pt-2"
              >
                <Link
                  href={BRAND.tallyFormUrl}
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-secondary text-[#1E0A46] font-semibold text-sm rounded-full hover:bg-secondary-hover transition-colors"
                >
                  Check-Up Başlatın
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
