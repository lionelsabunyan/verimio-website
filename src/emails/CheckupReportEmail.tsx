import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";

import type { CheckupAnalysis } from "@/lib/email";

interface CheckupReportEmailProps {
  recipientEmail: string;
  companyName: string;
  analysis: CheckupAnalysis;
  calendlyUrl?: string;
}

const BRAND_BLACK = "#0A0A0A";
const BRAND_GRAY = "#5C5C5C";
const BRAND_MUTED = "#A3A3A3";
const BRAND_BORDER = "#E5E5E5";
const BRAND_BG_SOFT = "#F5F5F5";
const SUCCESS = "#16A34A";
const DANGER = "#DC2626";

function scoreColor(score: number): string {
  if (score >= 7) return SUCCESS;
  if (score >= 4) return BRAND_GRAY;
  return DANGER;
}

export default function CheckupReportEmail({
  recipientEmail,
  companyName,
  analysis,
  calendlyUrl,
}: CheckupReportEmailProps) {
  const color = scoreColor(analysis.score);
  const scoreSegments = Array.from({ length: 10 }, (_, i) => i < analysis.score);
  const phases = [
    { label: "Adım 1", text: analysis.roadmap.phase1 },
    { label: "Adım 2", text: analysis.roadmap.phase2 },
    { label: "Adım 3", text: analysis.roadmap.phase3 },
  ].filter((p) => p.text);

  const previewText = `${companyName} için AI hazırlık raporunuz: ${analysis.score}/10 — ${analysis.top_opportunity.slice(0, 80)}`;

  return (
    <Html lang="tr">
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: BRAND_BLACK,
                "brand-muted": BRAND_MUTED,
                "brand-gray": BRAND_GRAY,
                "brand-border": BRAND_BORDER,
                "brand-soft": BRAND_BG_SOFT,
              },
              fontFamily: {
                sans: ["PP Neue Montreal", "system-ui", "sans-serif"],
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>
        <Body className="bg-white font-sans m-0 p-0">
          <Container className="max-w-[600px] mx-auto px-5 py-10">
            {/* Logo */}
            <Section className="pb-8">
              <Text className="text-2xl font-bold tracking-tight text-brand m-0">
                verimio
              </Text>
            </Section>

            {/* Hero */}
            <Section className="bg-white border border-brand-border border-b-0 rounded-t-2xl px-10 pt-9 pb-7">
              <Text className="text-xs uppercase tracking-widest text-brand-muted m-0 mb-2">
                AI Hazırlık Analizi
              </Text>
              <Heading
                as="h1"
                className="text-2xl font-bold leading-tight text-brand m-0 mb-3"
              >
                {companyName} için raporunuz hazır
              </Heading>
              <Text className="text-[15px] leading-7 text-brand-gray m-0">
                {analysis.summary}
              </Text>
            </Section>

            {/* Skor + g\u00f6rsel \u00e7ubuk */}
            <Section className="bg-white border-x border-brand-border px-10 py-7">
              <Section className="bg-brand-soft rounded-xl px-6 py-5">
                <Row>
                  <Column className="w-[110px] align-top">
                    <Text
                      className="text-5xl font-bold leading-none m-0"
                      style={{ color }}
                    >
                      {analysis.score}
                      <span className="text-xl text-brand-muted font-bold">
                        /10
                      </span>
                    </Text>
                  </Column>
                  <Column className="align-top pl-2">
                    <Text className="text-[15px] font-semibold text-brand m-0 mb-1">
                      AI Hazırlık Skoru
                    </Text>
                    <Text
                      className="text-[13px] font-semibold m-0"
                      style={{ color }}
                    >
                      {analysis.score_label}
                    </Text>
                  </Column>
                </Row>

                {/* G\u00f6rsel skor \u00e7ubu\u011fu — 10 segment */}
                <Row className="mt-4">
                  {scoreSegments.map((filled, i) => (
                    <Column key={i} className="px-px">
                      <div
                        style={{
                          height: "8px",
                          backgroundColor: filled ? color : BRAND_BORDER,
                          borderRadius: "1px",
                        }}
                      />
                    </Column>
                  ))}
                </Row>

                <Text className="text-[13px] leading-6 text-brand-gray mt-4 mb-0">
                  <strong className="text-brand">En büyük fırsat:</strong>{" "}
                  {analysis.top_opportunity}
                </Text>
                <Text className="text-[13px] leading-6 text-brand-gray mt-2 mb-0">
                  <strong className="text-brand">Tahmini kazanım:</strong>{" "}
                  {analysis.estimated_saving}
                </Text>
                {analysis.timeline_label && (
                  <Text className="text-[13px] leading-6 text-brand-gray mt-2 mb-0">
                    <strong className="text-brand">Uygulama süresi:</strong>{" "}
                    {analysis.timeline_label}
                  </Text>
                )}
              </Section>
            </Section>

            {/* \u00d6neriler */}
            <Section className="bg-white border-x border-brand-border px-10 pb-7">
              <Text className="text-[15px] font-semibold text-brand m-0 mb-1">
                Önerilen Aksiyonlar
              </Text>
              {analysis.recommendations.map((rec, i) => (
                <Section
                  key={i}
                  className="border-b border-brand-border py-3 last:border-b-0"
                >
                  <Row>
                    <Column className="w-[28px] align-top pt-[2px]">
                      <div
                        style={{
                          width: "22px",
                          height: "22px",
                          backgroundColor: BRAND_BLACK,
                          borderRadius: "50%",
                          textAlign: "center",
                          lineHeight: "22px",
                          color: "#FFFFFF",
                          fontSize: "11px",
                          fontWeight: 700,
                        }}
                      >
                        {i + 1}
                      </div>
                    </Column>
                    <Column className="align-top pl-3">
                      <Text className="text-[14px] font-semibold text-brand m-0 mb-1">
                        {rec.title}
                      </Text>
                      <Text className="text-[13px] leading-6 text-brand-gray m-0">
                        {rec.description}
                      </Text>
                    </Column>
                  </Row>
                </Section>
              ))}
            </Section>

            {/* Yol haritas\u0131 */}
            {phases.length > 0 && (
              <Section className="bg-white border-x border-brand-border px-10 pb-7">
                <Text className="text-[15px] font-semibold text-brand m-0 mb-4">
                  Uygulama Yol Haritası
                  {analysis.timeline_label ? ` — ${analysis.timeline_label}` : ""}
                </Text>
                {phases.map((phase, i) => (
                  <Row key={i} className="mb-2">
                    <Column className="w-[60px] align-top">
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: BRAND_BG_SOFT,
                          border: `1px solid ${BRAND_BORDER}`,
                          color: BRAND_BLACK,
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 8px",
                          borderRadius: "20px",
                        }}
                      >
                        {phase.label}
                      </span>
                    </Column>
                    <Column className="align-top pl-3">
                      <Text className="text-[13px] leading-6 text-brand-gray m-0">
                        {phase.text}
                      </Text>
                    </Column>
                  </Row>
                ))}
              </Section>
            )}

            {/* Sekt\u00f6r ba\u011flam\u0131 — yeni eklenen */}
            {analysis.consultant_guide?.sector_context && (
              <Section className="bg-white border-x border-brand-border px-10 pb-7">
                <Text className="text-[15px] font-semibold text-brand m-0 mb-2">
                  Sektörünüz için not
                </Text>
                <Text className="text-[13px] leading-7 text-brand-gray m-0">
                  {analysis.consultant_guide.sector_context}
                </Text>
              </Section>
            )}

            {/* CTA */}
            <Section className="bg-white border border-brand-border border-t-0 rounded-b-2xl px-10 pb-9">
              <Section className="bg-brand-soft rounded-xl p-6">
                <Text className="text-[15px] font-semibold text-brand m-0 mb-2">
                  Sonraki adımı konuşalım
                </Text>
                <Text className="text-[13px] leading-6 text-brand-gray m-0 mb-5">
                  Bu raporu birlikte inceleyip şirketinize özel uygulama planını
                  oluşturmak için 20 dakikalık ücretsiz bir görüşme ayarlayabilirsiniz.
                </Text>
                {calendlyUrl ? (
                  <Button
                    href={calendlyUrl}
                    className="bg-brand text-white text-[14px] font-bold rounded-lg px-6 py-3 no-underline"
                  >
                    Ücretsiz Görüşme Planla →
                  </Button>
                ) : (
                  <Text className="text-[13px] text-brand m-0">
                    Görüşme için:{" "}
                    <a
                      href="mailto:info@verimio.com.tr"
                      className="text-brand underline"
                    >
                      info@verimio.com.tr
                    </a>
                  </Text>
                )}
              </Section>
              <Hr className="border-brand-border mt-7 mb-5" />
              <Text className="text-[12px] leading-6 text-brand-muted m-0">
                Bu rapor{" "}
                <strong className="text-brand-gray">{recipientEmail}</strong>{" "}
                adresine gönderilmiştir.
                <br />
                Sorularınız için{" "}
                <a
                  href="mailto:info@verimio.com.tr"
                  className="text-brand underline"
                >
                  info@verimio.com.tr
                </a>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="pt-6">
              <Text className="text-[12px] text-brand-muted m-0">
                © 2026 Verimio ·{" "}
                <a
                  href="https://verimio.com.tr"
                  className="text-brand-muted no-underline"
                >
                  verimio.com.tr
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
