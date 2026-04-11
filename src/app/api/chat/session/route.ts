import { createServiceClient } from '@/lib/supabase/service';

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Çok fazla istek gönderdiniz.' },
        { status: 429 }
      );
    }

    const { visitorId } = (await req.json()) as { visitorId?: string };

    const supabase = createServiceClient();

    const { data: session, error } = await supabase
      .from('chat_sessions')
      .insert({ visitor_id: visitorId || 'anonymous' })
      .select('id')
      .single();

    if (error || !session) {
      console.error('[Chat Session] Hatası:', error);
      return Response.json({ error: 'Oturum başlatılamadı.' }, { status: 500 });
    }

    return Response.json({ sessionId: session.id });
  } catch (err) {
    console.error('[Chat Session] Beklenmeyen:', err);
    return Response.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
