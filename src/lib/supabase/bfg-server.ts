import { createClient } from '@supabase/supabase-js'

export function createBFGClient() {
  return createClient(
    process.env.BFG_SUPABASE_URL!,
    process.env.BFG_SUPABASE_SERVICE_KEY!
  )
}
