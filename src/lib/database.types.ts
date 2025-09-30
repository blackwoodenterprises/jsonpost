export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      autoresponder_logs: {
        Row: {
          created_at: string | null
          endpoint_id: string
          error_message: string | null
          id: string
          provider: string
          provider_message_id: string | null
          recipient_email: string
          sent_at: string | null
          status: string
          submission_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint_id: string
          error_message?: string | null
          id?: string
          provider: string
          provider_message_id?: string | null
          recipient_email: string
          sent_at?: string | null
          status: string
          submission_id: string
        }
        Update: {
          created_at?: string | null
          endpoint_id?: string
          error_message?: string | null
          id?: string
          provider?: string
          provider_message_id?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "autoresponder_logs_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "autoresponder_logs_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "autoresponder_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      email_logs: {
        Row: {
          created_at: string | null
          endpoint_email_id: string | null
          error_message: string | null
          id: string
          recipient_email: string
          sent_at: string | null
          status: string
          submission_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint_email_id?: string | null
          error_message?: string | null
          id?: string
          recipient_email: string
          sent_at?: string | null
          status: string
          submission_id: string
        }
        Update: {
          created_at?: string | null
          endpoint_email_id?: string | null
          error_message?: string | null
          id?: string
          recipient_email?: string
          sent_at?: string | null
          status?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_endpoint_email_id_fkey"
            columns: ["endpoint_email_id"]
            isOneToOne: false
            referencedRelation: "endpoint_emails"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      endpoint_emails: {
        Row: {
          created_at: string | null
          email_address: string
          endpoint_id: string
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email_address: string
          endpoint_id: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email_address?: string
          endpoint_id?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "endpoint_emails_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "endpoint_emails_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      endpoint_webhooks: {
        Row: {
          created_at: string | null
          endpoint_id: string
          id: string
          is_active: boolean | null
          updated_at: string | null
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          endpoint_id: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          endpoint_id?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "endpoint_webhooks_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "endpoint_webhooks_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      endpoints: {
        Row: {
          allowed_domains: string[] | null
          allowed_file_types: string[] | null
          autoresponder_api_key: string | null
          autoresponder_domain: string | null
          autoresponder_enabled: boolean | null
          autoresponder_from_email: string | null
          autoresponder_from_name: string | null
          autoresponder_html_template: string | null
          autoresponder_provider: string | null
          autoresponder_recipient_field: string | null
          autoresponder_subject: string | null
          autoresponder_text_template: string | null
          branding_cover: string | null
          branding_logo: string | null
          cors_enabled: boolean | null
          created_at: string | null
          description: string | null
          email_notifications: boolean | null
          endpoint_key: string
          endpoint_key_deprecated: boolean | null
          error_message: string | null
          file_uploads_enabled: boolean | null
          form_json: Json | null
          google_sheets_column_mappings: Json | null
          google_sheets_enabled: boolean | null
          google_sheets_sheet_name: string | null
          google_sheets_spreadsheet_id: string | null
          id: string
          json_schema: Json | null
          json_validation_enabled: boolean | null
          jsonpost_branding: boolean | null
          max_file_size_mb: number | null
          max_files_per_submission: number | null
          method: string
          name: string
          path: string
          project_id: string
          redirect_url: string | null
          require_api_key: boolean | null
          spam_protection: boolean | null
          store_submissions: boolean | null
          success_message: string | null
          svix_app_id: string | null
          theme_id: string | null
          updated_at: string | null
          uses_multiple_emails: boolean | null
          uses_multiple_webhooks: boolean | null
          variable_paths: string[] | null
          webhook_json_transformation_enabled: boolean | null
          webhook_json_transformation_template: Json | null
          webhook_url: string | null
          webhooks_enabled: boolean | null
        }
        Insert: {
          allowed_domains?: string[] | null
          allowed_file_types?: string[] | null
          autoresponder_api_key?: string | null
          autoresponder_domain?: string | null
          autoresponder_enabled?: boolean | null
          autoresponder_from_email?: string | null
          autoresponder_from_name?: string | null
          autoresponder_html_template?: string | null
          autoresponder_provider?: string | null
          autoresponder_recipient_field?: string | null
          autoresponder_subject?: string | null
          autoresponder_text_template?: string | null
          branding_cover?: string | null
          branding_logo?: string | null
          cors_enabled?: boolean | null
          created_at?: string | null
          description?: string | null
          email_notifications?: boolean | null
          endpoint_key?: string
          endpoint_key_deprecated?: boolean | null
          error_message?: string | null
          file_uploads_enabled?: boolean | null
          form_json?: Json | null
          google_sheets_column_mappings?: Json | null
          google_sheets_enabled?: boolean | null
          google_sheets_sheet_name?: string | null
          google_sheets_spreadsheet_id?: string | null
          id?: string
          json_schema?: Json | null
          json_validation_enabled?: boolean | null
          jsonpost_branding?: boolean | null
          max_file_size_mb?: number | null
          max_files_per_submission?: number | null
          method?: string
          name: string
          path: string
          project_id: string
          redirect_url?: string | null
          require_api_key?: boolean | null
          spam_protection?: boolean | null
          store_submissions?: boolean | null
          success_message?: string | null
          svix_app_id?: string | null
          theme_id?: string | null
          updated_at?: string | null
          uses_multiple_emails?: boolean | null
          uses_multiple_webhooks?: boolean | null
          variable_paths?: string[] | null
          webhook_json_transformation_enabled?: boolean | null
          webhook_json_transformation_template?: Json | null
          webhook_url?: string | null
          webhooks_enabled?: boolean | null
        }
        Update: {
          allowed_domains?: string[] | null
          allowed_file_types?: string[] | null
          autoresponder_api_key?: string | null
          autoresponder_domain?: string | null
          autoresponder_enabled?: boolean | null
          autoresponder_from_email?: string | null
          autoresponder_from_name?: string | null
          autoresponder_html_template?: string | null
          autoresponder_provider?: string | null
          autoresponder_recipient_field?: string | null
          autoresponder_subject?: string | null
          autoresponder_text_template?: string | null
          branding_cover?: string | null
          branding_logo?: string | null
          cors_enabled?: boolean | null
          created_at?: string | null
          description?: string | null
          email_notifications?: boolean | null
          endpoint_key?: string
          endpoint_key_deprecated?: boolean | null
          error_message?: string | null
          file_uploads_enabled?: boolean | null
          form_json?: Json | null
          google_sheets_column_mappings?: Json | null
          google_sheets_enabled?: boolean | null
          google_sheets_sheet_name?: string | null
          google_sheets_spreadsheet_id?: string | null
          id?: string
          json_schema?: Json | null
          json_validation_enabled?: boolean | null
          jsonpost_branding?: boolean | null
          max_file_size_mb?: number | null
          max_files_per_submission?: number | null
          method?: string
          name?: string
          path?: string
          project_id?: string
          redirect_url?: string | null
          require_api_key?: boolean | null
          spam_protection?: boolean | null
          store_submissions?: boolean | null
          success_message?: string | null
          svix_app_id?: string | null
          theme_id?: string | null
          updated_at?: string | null
          uses_multiple_emails?: boolean | null
          uses_multiple_webhooks?: boolean | null
          variable_paths?: string[] | null
          webhook_json_transformation_enabled?: boolean | null
          webhook_json_transformation_template?: Json | null
          webhook_url?: string | null
          webhooks_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "endpoints_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "endpoints_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      file_uploads: {
        Row: {
          created_at: string | null
          file_path: string
          file_size_bytes: number
          id: string
          mime_type: string
          original_filename: string
          storage_bucket: string
          stored_filename: string
          submission_id: string
        }
        Insert: {
          created_at?: string | null
          file_path: string
          file_size_bytes: number
          id?: string
          mime_type: string
          original_filename: string
          storage_bucket?: string
          stored_filename: string
          submission_id: string
        }
        Update: {
          created_at?: string | null
          file_path?: string
          file_size_bytes?: number
          id?: string
          mime_type?: string
          original_filename?: string
          storage_bucket?: string
          stored_filename?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_submission_counts: {
        Row: {
          created_at: string | null
          id: string
          month: number
          submission_count: number
          updated_at: string | null
          user_id: string
          year: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          month: number
          submission_count?: number
          updated_at?: string | null
          user_id: string
          year: number
        }
        Update: {
          created_at?: string | null
          id?: string
          month?: number
          submission_count?: number
          updated_at?: string | null
          user_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "monthly_submission_counts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          dodo_customer_id: string | null
          dodo_last_payment_date: string | null
          dodo_next_payment_date: string | null
          dodo_subscription_cancel_at_period_end: boolean | null
          dodo_subscription_current_period_end: string | null
          dodo_subscription_current_period_start: string | null
          dodo_subscription_id: string | null
          dodo_subscription_status: string | null
          email: string
          full_name: string | null
          id: string
          plan: Database["public"]["Enums"]["plan_type"]
          updated_at: string | null
          zapier_api_key: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          dodo_customer_id?: string | null
          dodo_last_payment_date?: string | null
          dodo_next_payment_date?: string | null
          dodo_subscription_cancel_at_period_end?: boolean | null
          dodo_subscription_current_period_end?: string | null
          dodo_subscription_current_period_start?: string | null
          dodo_subscription_id?: string | null
          dodo_subscription_status?: string | null
          email: string
          full_name?: string | null
          id: string
          plan?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string | null
          zapier_api_key?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          dodo_customer_id?: string | null
          dodo_last_payment_date?: string | null
          dodo_next_payment_date?: string | null
          dodo_subscription_cancel_at_period_end?: boolean | null
          dodo_subscription_current_period_end?: string | null
          dodo_subscription_current_period_start?: string | null
          dodo_subscription_id?: string | null
          dodo_subscription_status?: string | null
          email?: string
          full_name?: string | null
          id?: string
          plan?: Database["public"]["Enums"]["plan_type"]
          updated_at?: string | null
          zapier_api_key?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          api_key: string
          created_at: string | null
          description: string | null
          google_sheets_access_token: string | null
          google_sheets_connected_at: string | null
          google_sheets_refresh_token: string | null
          google_sheets_token_expires_at: string | null
          google_sheets_user_email: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_key?: string
          created_at?: string | null
          description?: string | null
          google_sheets_access_token?: string | null
          google_sheets_connected_at?: string | null
          google_sheets_refresh_token?: string | null
          google_sheets_token_expires_at?: string | null
          google_sheets_user_email?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          description?: string | null
          google_sheets_access_token?: string | null
          google_sheets_connected_at?: string | null
          google_sheets_refresh_token?: string | null
          google_sheets_token_expires_at?: string | null
          google_sheets_user_email?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      short_links: {
        Row: {
          created_at: string | null
          endpoint_id: string
          form_type: string
          id: string
          short_code: string
          theme: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          endpoint_id: string
          form_type: string
          id?: string
          short_code: string
          theme: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          endpoint_id?: string
          form_type?: string
          id?: string
          short_code?: string
          theme?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "short_links_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "short_links_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      submissions: {
        Row: {
          created_at: string | null
          data: Json
          endpoint_id: string
          id: string
          ip_address: unknown | null
          user_agent: string | null
          zapier_status: string | null
        }
        Insert: {
          created_at?: string | null
          data: Json
          endpoint_id: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          zapier_status?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json
          endpoint_id?: string
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          zapier_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "submissions_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "submissions_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          endpoint_webhook_id: string | null
          error_message: string | null
          id: string
          response_body: string | null
          sent_at: string | null
          status: string
          status_code: number | null
          submission_id: string
          webhook_url: string
        }
        Insert: {
          created_at?: string | null
          endpoint_webhook_id?: string | null
          error_message?: string | null
          id?: string
          response_body?: string | null
          sent_at?: string | null
          status: string
          status_code?: number | null
          submission_id: string
          webhook_url: string
        }
        Update: {
          created_at?: string | null
          endpoint_webhook_id?: string | null
          error_message?: string | null
          id?: string
          response_body?: string | null
          sent_at?: string | null
          status?: string
          status_code?: number | null
          submission_id?: string
          webhook_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "webhook_logs_endpoint_webhook_id_fkey"
            columns: ["endpoint_webhook_id"]
            isOneToOne: false
            referencedRelation: "endpoint_webhooks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "webhook_logs_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      zapier_subscriptions: {
        Row: {
          created_at: string | null
          endpoint_id: string
          event_type: string
          id: string
          is_active: boolean | null
          target_url: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          endpoint_id: string
          event_type?: string
          id?: string
          is_active?: boolean | null
          target_url: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          endpoint_id?: string
          event_type?: string
          id?: string
          is_active?: boolean | null
          target_url?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "zapier_subscriptions_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoint_security_view"
            referencedColumns: ["endpoint_id"]
          },
          {
            foreignKeyName: "zapier_subscriptions_endpoint_id_fkey"
            columns: ["endpoint_id"]
            isOneToOne: false
            referencedRelation: "endpoints"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "zapier_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      endpoint_security_view: {
        Row: {
          allowed_domains: string[] | null
          api_key_required: boolean | null
          api_key_status: string | null
          cors_enabled: boolean | null
          cors_status: string | null
          endpoint_id: string | null
          endpoint_name: string | null
          endpoint_path: string | null
          project_api_key: string | null
          project_id: string | null
          project_name: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_project_with_api_key: {
        Args: { p_description: string; p_name: string; p_user_id: string }
        Returns: {
          api_key: string
          created_at: string
          description: string
          id: string
          name: string
        }[]
      }
      generate_project_api_key: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_month_submission_count: {
        Args: { p_user_id: string }
        Returns: number
      }
      increment_monthly_submission_count: {
        Args: { p_month: number; p_user_id: string; p_year: number }
        Returns: undefined
      }
      regenerate_project_api_key: {
        Args: { project_id: string }
        Returns: string
      }
    }
    Enums: {
      plan_type: "FREE" | "PRO" | "GROWTH" | "ENTERPRISE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      plan_type: ["FREE", "PRO", "GROWTH", "ENTERPRISE"],
    },
  },
} as const
