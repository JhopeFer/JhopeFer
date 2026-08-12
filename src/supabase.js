import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim()
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

export let supabaseInitError = null
let supabase = null

if (isSupabaseConfigured) {
  if (supabaseKey.startsWith('sb_secret_')) {
    supabaseInitError =
      'VITE_SUPABASE_ANON_KEY is set to a secret key. Use the anon/public or publishable key from Supabase Dashboard -> Settings -> API.'
    console.error(supabaseInitError)
  } else {
    supabase = createClient(supabaseUrl, supabaseKey)
  }
} else {
  console.warn(
    'Supabase credentials missing. Dynamic portfolio data, comments, and admin login are disabled until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are configured.'
  )
}

export { supabase }
