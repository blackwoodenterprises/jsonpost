import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

export type { Database } from './database.types'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Export a default supabase client instance for backward compatibility
export const supabase = createClient()