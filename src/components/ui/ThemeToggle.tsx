"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const themes = ["light", "dark", "system"] as const;

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const Icon = icons[theme];

  return (
    <motion.button
      onClick={cycle}
      className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-foreground/5 hover:bg-foreground/10 transition-colors duration-200"
      whileTap={{ scale: 0.9 }}
      aria-label={`Tema: ${theme === "light" ? "Açık" : theme === "dark" ? "Koyu" : "Sistem"}`}
      title={`Tema: ${theme === "light" ? "Açık" : theme === "dark" ? "Koyu" : "Sistem"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.15 }}
        >
          <Icon className="w-4 h-4 text-foreground-secondary" />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
