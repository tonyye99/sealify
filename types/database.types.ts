/**
 * Database type definitions for Supabase
 * These types match the schema in Supabase
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      // Define your tables here
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
        }
      }
      // Add more tables as needed
    }
    Views: {
      // Define your views here
      [_ in never]: never
    }
    Functions: {
      // Define your functions here
      [_ in never]: never
    }
    Enums: {
      // Define your enums here
      [_ in never]: never
    }
  }
}

// Helper type for extracting row types from tables
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Type aliases for convenience
export type Profile = Tables<'profiles'>
