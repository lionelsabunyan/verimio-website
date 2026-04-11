'use client';

import type { UIMessage } from 'ai';

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed ${
          isUser
            ? 'bg-[#0A0A0A] text-white rounded-[16px_16px_4px_16px]'
            : 'bg-white text-[#0A0A0A] border border-[#E5E5E5] rounded-[16px_16px_16px_4px]'
        }`}
      >
        {message.parts.map((part, i) => {
          if (part.type === 'text') {
            return (
              <span key={i} className="whitespace-pre-wrap">
                {formatText(part.text)}
              </span>
            );
          }

          // Tool: collectDetailedInfo
          if (part.type === 'tool-collectDetailedInfo') {
            if (part.state === 'output-available') {
              const output = part.output as { success: boolean; message: string };
              return (
                <div key={i} className="mt-2 px-3 py-2 border border-[#E5E5E5] rounded-lg bg-white">
                  <p className="text-xs text-[#5C5C5C]">{output.message}</p>
                </div>
              );
            }
            if (part.state === 'input-available') {
              return (
                <span key={i} className="text-xs text-[#A3A3A3] italic">
                  Bilgiler kaydediliyor...
                </span>
              );
            }
          }

          // Tool: suggestMeeting
          if (part.type === 'tool-suggestMeeting') {
            if (part.state === 'output-available') {
              const output = part.output as { calendlyUrl: string };
              return (
                <div key={i} className="mt-2">
                  <a
                    href={output.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A0A0A] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Ücretsiz Görüşme Al
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              );
            }
            if (part.state === 'input-available') {
              return (
                <span key={i} className="text-xs text-[#A3A3A3] italic">
                  Randevu linki hazırlanıyor...
                </span>
              );
            }
          }

          // Tool: getArticleInfo
          if (part.type === 'tool-getArticleInfo') {
            if (part.state === 'output-available') {
              const output = part.output as {
                found: boolean;
                articles?: { title: string; url: string }[];
              };
              if (output.found && output.articles) {
                return (
                  <div key={i} className="mt-2 space-y-1.5">
                    {output.articles.map((article, j) => (
                      <a
                        key={j}
                        href={article.url}
                        className="block text-sm text-[#0A0A0A] underline underline-offset-2 hover:opacity-70 transition-opacity"
                      >
                        {article.title}
                      </a>
                    ))}
                  </div>
                );
              }
            }
            if (part.state === 'input-available') {
              return (
                <span key={i} className="text-xs text-[#A3A3A3] italic">
                  İlgili yazılar aranıyor...
                </span>
              );
            }
          }

          return null;
        })}
      </div>
    </div>
  );
}

// Basit markdown: **bold**, [link](url)
function formatText(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const pattern = /\*\*(.*?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <strong key={match.index} className="font-medium">
          {match[1]}
        </strong>
      );
    } else if (match[2] && match[3]) {
      const isExternal = match[3].startsWith('http');
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className="underline underline-offset-2 hover:opacity-70 transition-opacity"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {match[2]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
