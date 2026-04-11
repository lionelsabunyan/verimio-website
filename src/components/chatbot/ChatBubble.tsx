'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from './ChatProvider';
import { ChatPanel } from './ChatPanel';

export function ChatBubble() {
  const { isOpen, open } = useChatContext();

  return (
    <>
      <ChatPanel />

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={open}
            className="font-[var(--font-pp-neue-montreal)] fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
            style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
            aria-label="Sohbet asistanını aç"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
