import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const FAL_KEY = process.env.FAL_KEY;
  if (!FAL_KEY) {
    return NextResponse.json({ error: "FAL_KEY bulunamadı" }, { status: 500 });
  }

  const { prompt, model, style, imageSize } = await req.json();

  const modelId = model === "recraft"
    ? "fal-ai/recraft/v3/text-to-image"
    : "fal-ai/flux-pro/v1.1";

  const body: Record<string, unknown> = {
    prompt,
    image_size: imageSize ?? "landscape_16_9",
    output_format: "png",
    seed: 42,
  };

  if (model === "recraft" && style) {
    body.style = style;
  }

  const headers = {
    "Authorization": `Key ${FAL_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    // 1. Submit to queue
    const submitRes = await fetch(`https://queue.fal.run/${modelId}`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!submitRes.ok) {
      const err = await submitRes.text();
      return NextResponse.json({ error: err }, { status: submitRes.status });
    }

    const queued = await submitRes.json();
    const requestId: string = queued.request_id;
    const statusBase = `https://queue.fal.run/${modelId}/requests/${requestId}`;

    // 2. Poll with GET (not POST) — max 90s
    for (let i = 0; i < 45; i++) {
      await new Promise((r) => setTimeout(r, 2000));

      const statusRes = await fetch(`${statusBase}/status`, {
        method: "GET",
        headers: { "Authorization": `Key ${FAL_KEY}` },
      });
      const status = await statusRes.json();

      if (status.status === "COMPLETED") {
        const resultRes = await fetch(statusBase, {
          method: "GET",
          headers: { "Authorization": `Key ${FAL_KEY}` },
        });
        const result = await resultRes.json();
        const imageUrl =
          result.images?.[0]?.url ??
          result.image?.url ??
          result.output?.images?.[0]?.url;

        if (!imageUrl) {
          return NextResponse.json({ error: "URL bulunamadı" }, { status: 500 });
        }
        return NextResponse.json({ url: imageUrl });
      }

      if (status.status === "FAILED") {
        return NextResponse.json({ error: "Üretim başarısız" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Zaman aşımı (90s)" }, { status: 408 });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export const maxDuration = 120;
