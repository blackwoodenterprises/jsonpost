import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      endpoints: {
        Row: {
          id: string
          name: string
          description: string | null
          project_id: string
          endpoint_key: string
          method: string
          path: string
          allowed_domains: string[] | null
          email_notifications: string[] | null
          webhook_url: string | null
          redirect_url: string | null
          success_message: string
          error_message: string
          store_submissions: boolean
          spam_protection: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          project_id: string
          endpoint_key?: string
          method?: string
          path: string
          allowed_domains?: string[] | null
          email_notifications?: string[] | null
          webhook_url?: string | null
          redirect_url?: string | null
          success_message?: string
          error_message?: string
          store_submissions?: boolean
          spam_protection?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          project_id?: string
          endpoint_key?: string
          method?: string
          path?: string
          allowed_domains?: string[] | null
          email_notifications?: string[] | null
          webhook_url?: string | null
          redirect_url?: string | null
          success_message?: string
          error_message?: string
          store_submissions?: boolean
          spam_protection?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          endpoint_id: string
          data: Record<string, unknown>
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          endpoint_id: string
          data: Record<string, unknown>
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          endpoint_id?: string
          data?: Record<string, unknown>
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}