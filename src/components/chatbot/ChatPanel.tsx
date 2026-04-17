'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from './ChatProvider';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatPanel() {
  const { isOpen, close, sessionId, setSessionId, visitorId } = useChatContext();
  const [initializing, setInitializing] = useState(false);

  useEffect(() => {
    if (isOpen && !sessionId && !initializing) {
      setInitializing(true);
      fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.sessionId) setSessionId(data.sessionId);
        })
        .catch(() => {})
        .finally(() => setInitializing(false));
    }
  }, [isOpen, sessionId, initializing, visitorId, setSessionId]);

  // Mobilde panel fullscreen — body scroll'u arka planda kilitle
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (!isMobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="font-[var(--font-pp-neue-montreal)] fixed z-50 bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden flex flex-col
                     bottom-6 right-6 w-[400px] h-[580px] max-h-[calc(100vh-48px)]
                     max-md:inset-x-3 max-md:bottom-3 max-md:w-auto max-md:h-[calc(100vh-24px)] max-md:max-h-none"
          style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5E5E5]">
            <div>
              <p className="text-[15px] font-medium text-[#0A0A0A] leading-tight">
                Verimio AI Asistan
              </p>
              <p className="text-xs text-[#A3A3A3] mt-0.5">Çevrimiçi</p>
            </div>
            <button
              onClick={close}
              className="p-1.5 rounded-lg hover:bg-[#E5E5E5] transition-colors"
              aria-label="Sohbeti kapat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {sessionId ? (
            <ChatView sessionId={sessionId} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-[#A3A3A3]">Bağlanıyor...</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChatView({ sessionId }: { sessionId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (isLoading || !text.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };

    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    };

    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, assistantMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Stream başlatılamadı');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = { ...assistantMsg, content: fullText };
          return copy;
        });
      }
    } catch (err) {
      console.error('[Chat] Hata:', err);
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = {
          ...assistantMsg,
          content: 'Üzgünüm, bir bağlantı sorunu oluştu. Lütfen tekrar deneyin.',
        };
        return copy;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="mb-3">
            <div className="flex justify-start mb-3">
              <div className="max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed bg-white text-[#0A0A0A] border border-[#E5E5E5] rounded-[16px_16px_16px_4px]">
                Merhaba, Verimio AI asistanıyım. Size nasıl yardımcı olabilirim?
              </div>
            </div>
            <div className="space-y-2 mt-4">
              {QUICK_ACTIONS.map((action, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(action)}
                  className="block w-full text-left px-3 py-2 text-sm text-[#0A0A0A] border border-[#E5E5E5] rounded-lg hover:bg-[#E5E5E5] transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-[#0A0A0A] text-white rounded-[16px_16px_4px_16px]'
                  : 'bg-white text-[#0A0A0A] border border-[#E5E5E5] rounded-[16px_16px_16px_4px]'
              }`}
            >
              {message.content ? (
                renderMarkdown(message.content, message.role === 'user')
              ) : (
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-[#A3A3A3] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[#E5E5E5]">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 px-3 py-2 text-sm text-[#0A0A0A] bg-white border border-[#E5E5E5] rounded-lg outline-none focus:border-[#0A0A0A] placeholder:text-[#A3A3A3] transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-[#0A0A0A] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-40"
            aria-label="Gönder"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}

const QUICK_ACTIONS = [
  'Verimio ne yapıyor?',
  'Şirketim için AI check-up yaptırmak istiyorum',
  'Ücretsiz görüşme almak istiyorum',
  'Mesaj bırakmak istiyorum',
];

function renderMarkdown(text: string, isUser: boolean): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const mdRegex = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = mdRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <strong key={`b-${key++}`} className="font-medium">
          {match[1]}
        </strong>
      );
    } else if (match[2] && match[3]) {
      const label = match[2];
      const url = match[3];
      const isExternal = url.startsWith('http');
      const isCTA = /görüşme|check-up|randevu|calendly|analiz/i.test(label);

      if (isCTA && !isUser) {
        parts.push(
          <span key={`c-${key++}`} className="inline-block mt-2">
            <a
              href={url}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0A0A0A] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity no-underline"
            >
              {label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </span>
        );
      } else {
        parts.push(
          <a
            key={`l-${key++}`}
            href={url}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className={`underline underline-offset-2 hover:opacity-70 transition-opacity ${
              isUser ? 'text-white' : 'text-[#0A0A0A]'
            }`}
          >
            {label}
          </a>
        );
      }
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
