import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

let supabase = null

if (isSupabaseConfigured) {
  if (supabaseKey.startsWith('sb_secret_')) {
    console.error(
      'VITE_SUPABASE_ANON_KEY is set to a secret key. Use the anon/public key from Supabase Dashboard -> Settings -> API.'
    )
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} else {
  console.warn(
    'Supabase credentials missing. Dynamic portfolio data, comments, and admin login are disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.'
  )
}

export { supabase }
