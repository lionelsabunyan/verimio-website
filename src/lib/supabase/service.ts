import { createClient } from '@supabase/supabase-js'

// Service role client for daemon-facing API routes (bypasses RLS)
// Vercel Supabase entegrasyonu SUPABASE_SERVICE_ROLE_KEY kullanir
export function createServiceClient() {
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY

  if (!serviceKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY veya SUPABASE_SERVICE_KEY env var bulunamadi'
    )
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey
  )
}
