'use client';

import { usePathname } from 'next/navigation';
import { ChatProvider } from './ChatProvider';
import { ChatBubble } from './ChatBubble';

/**
 * Chatbot widget wrapper — admin sayfalarında gösterilmez
 */
export function ChatWidget() {
  const pathname = usePathname();

  // Admin sayfalarında chatbot gösterme
  if (pathname.startsWith('/admin')) return null;

  return (
    <ChatProvider>
      <ChatBubble />
    </ChatProvider>
  );
}
