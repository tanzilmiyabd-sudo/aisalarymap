import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for TypeScript
export interface SalaryData {
  id: number
  created_at: string
  company: string
  role: string
  level: string
  location: string
  base_salary: number
  bonus: number
  equity: number
  total_comp: number
  years_of_experience: number
}