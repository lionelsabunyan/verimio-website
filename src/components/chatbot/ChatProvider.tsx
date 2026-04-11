'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

interface ChatContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
  visitorId: string;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}

function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'ssr';
  const key = 'verimio_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorId, setVisitorId] = useState('ssr');

  useEffect(() => {
    setVisitorId(getOrCreateVisitorId());
  }, []);

  const open = useCallback(() => setIsOpen(true), []);

  const close = useCallback(() => {
    if (sessionId) {
      fetch('/api/chat', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    }
    setIsOpen(false);
  }, [sessionId]);

  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, open, close]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        open,
        close,
        toggle,
        sessionId,
        setSessionId,
        visitorId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
