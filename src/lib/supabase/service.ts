import { createClient } from '@supabase/supabase-js'

// Service role client for daemon-facing API routes (bypasses RLS)
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}
