export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * MDX content içinden "## Sık Sorulan Sorular" bölümünü parse eder.
 * Bu bölüm altındaki her h3 başlığı bir soru, onu izleyen paragraf(lar) cevap olur.
 * Bir sonraki h2 geldiğinde bölüm sonlanır.
 */
export function extractFaqFromContent(content: string): FaqItem[] {
  const lines = content.split("\n");
  const items: FaqItem[] = [];
  let inFaqSection = false;
  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  const flush = () => {
    if (currentQuestion && currentAnswer.length > 0) {
      items.push({
        question: currentQuestion.trim(),
        answer: currentAnswer.join(" ").replace(/\s+/g, " ").trim(),
      });
    }
    currentQuestion = null;
    currentAnswer = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();

    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      flush();
      const title = h2Match[1].toLowerCase();
      inFaqSection =
        title.includes("sık sorulan soru") ||
        title.includes("sorularınız") ||
        /^faq$/i.test(h2Match[1].trim()) ||
        title.includes("sss");
      continue;
    }

    if (!inFaqSection) continue;

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      flush();
      currentQuestion = h3Match[1].trim();
      continue;
    }

    if (currentQuestion && line.trim().length > 0) {
      if (line.startsWith("> ") || line.startsWith("#")) continue;
      const clean = line.replace(/^[-*]\s+/, "").replace(/\*\*/g, "");
      currentAnswer.push(clean);
    }
  }

  flush();
  return items;
}
