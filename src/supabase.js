import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials missing. Check your .env file.')
}

if (supabaseKey.startsWith('sb_secret_')) {
  throw new Error(
    'VITE_SUPABASE_ANON_KEY is set to a secret key. Use the anon/public key from Supabase Dashboard → Settings → API.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)