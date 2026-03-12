import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { suggestionId } = body

  if (!suggestionId) {
    return NextResponse.json(
      { error: 'suggestionId gerekli' },
      { status: 400 }
    )
  }

  // 1. Suggestion'ı al
  const { data: suggestion, error: fetchError } = await supabase
    .from('content_suggestions')
    .select('*')
    .eq('id', suggestionId)
    .single()

  if (fetchError || !suggestion) {
    return NextResponse.json(
      { error: 'Öneri bulunamadı' },
      { status: 404 }
    )
  }

  // 2. Status → 'publishing' güncelle
  await supabase
    .from('content_suggestions')
    .update({ status: 'publishing' })
    .eq('id', suggestionId)

  // 3. command_jobs'a insert
  const { data: job, error: jobError } = await supabase
    .from('command_jobs')
    .insert({
      project: 'verimio-website',
      skill: 'suggestion-publisher',
      input: {
        title: suggestion.title,
        topic: suggestion.topic,
        category: detectCategory(suggestion),
        keywords: suggestion.keywords || [],
        targetAudience: 'Türk KOBİ\'leri',
        suggestionId: suggestion.id,
      },
      priority: 3,
      status: 'queued',
      created_by: 'panel',
    })
    .select()
    .single()

  if (jobError) {
    // Rollback status
    await supabase
      .from('content_suggestions')
      .update({ status: 'in_progress' })
      .eq('id', suggestionId)

    return NextResponse.json(
      { error: jobError.message },
      { status: 500 }
    )
  }

  return NextResponse.json({
    jobId: job.id,
    message: 'Yayınlama başlatıldı — daemon işleme alacak',
  })
}

// Suggestion'dan blog kategorisi çıkar
function detectCategory(suggestion: { title: string; topic: string; keywords?: string[] }): string {
  const text = `${suggestion.title} ${suggestion.topic} ${(suggestion.keywords || []).join(' ')}`.toLowerCase()

  const patterns: [string, string[]][] = [
    ['tutorial', ['nasıl', 'adım adım', 'kurulum', 'rehber', 'öğren', 'başlangıç']],
    ['automation', ['otomasyon', 'otomatik', 'n8n', 'make', 'zapier', 'iş akışı', 'workflow']],
    ['ai-tools', ['yapay zeka', 'ai', 'chatgpt', 'claude', 'llm', 'model', 'araç']],
    ['strategy', ['strateji', 'planlama', 'dönüşüm', 'dijital', 'yol haritası', 'danışmanlık']],
    ['data', ['veri', 'data', 'analiz', 'dashboard', 'raporlama', 'metrik']],
    ['roi', ['roi', 'yatırım', 'maliyet', 'tasarruf', 'verimlilik', 'kazanç', 'geri dönüş']],
    ['customer', ['müşteri', 'chatbot', 'destek', 'deneyim', 'crm', 'iletişim']],
    ['security', ['güvenlik', 'gizlilik', 'risk', 'uyumluluk', 'kvkk', 'gdpr']],
  ]

  for (const [category, keywords] of patterns) {
    const matchCount = keywords.filter(kw => text.includes(kw)).length
    if (matchCount >= 2) return category
  }

  // Default: content_type bazlı fallback
  return 'strategy'
}
