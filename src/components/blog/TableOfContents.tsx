"use client";

import { useState } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractTocItems(mdxContent: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\sğüşıöçĞÜŞİÖÇ-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    items.push({ id, text, level });
  }

  return items;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (items.length < 3) return null;

  return (
    <nav className="mb-12 border border-border p-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-xs font-medium text-foreground-muted tracking-[0.15em] uppercase">
          İçindekiler
        </span>
        <span className="text-foreground-muted text-sm">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <ol className="mt-4 space-y-1.5 list-none pl-0">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`text-sm text-foreground-secondary hover:text-foreground transition-colors block ${
                  item.level === 3 ? "pl-4" : ""
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
