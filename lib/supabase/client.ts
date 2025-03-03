import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing environment variables for Supabase')
}

// Create a strongly typed Supabase client
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
