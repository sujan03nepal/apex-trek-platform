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
      about_content: {
        Row: {
          content: string | null
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          section_key: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          section_key: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          section_key?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          new_values: Json | null
          old_values: Json | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          new_values?: Json | null
          old_values?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          og_image_url: string | null
          published_at: string | null
          schema_data: Json | null
          seo_keywords: string[] | null
          slug: string
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          schema_data?: Json | null
          seo_keywords?: string[] | null
          slug: string
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          og_image_url?: string | null
          published_at?: string | null
          schema_data?: Json | null
          seo_keywords?: string[] | null
          slug?: string
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_status: string | null
          confirmation_sent_at: string | null
          country: string | null
          created_at: string | null
          departure_date: string
          dietary_requirements: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          paid_amount: number | null
          payment_method: string | null
          payment_status: string | null
          phone: string
          special_requests: string | null
          total_price: number
          travelers_count: number
          trek_id: string
          updated_at: string | null
        }
        Insert: {
          booking_status?: string | null
          confirmation_sent_at?: string | null
          country?: string | null
          created_at?: string | null
          departure_date: string
          dietary_requirements?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          paid_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          phone: string
          special_requests?: string | null
          total_price: number
          travelers_count?: number
          trek_id: string
          updated_at?: string | null
        }
        Update: {
          booking_status?: string | null
          confirmation_sent_at?: string | null
          country?: string | null
          created_at?: string | null
          departure_date?: string
          dietary_requirements?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          paid_amount?: number | null
          payment_method?: string | null
          payment_status?: string | null
          phone?: string
          special_requests?: string | null
          total_price?: number
          travelers_count?: number
          trek_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "featured_treks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_read: boolean | null
          message: string
          phone: string | null
          responded_at: string | null
          responded_by: string | null
          response_text: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          is_read?: boolean | null
          message: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          response_text?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_read?: boolean | null
          message?: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          response_text?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contact_submissions_responded_by_fkey"
            columns: ["responded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          question: string
          updated_at: string | null
        }
        Insert: {
          answer: string
          category: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question: string
          updated_at?: string | null
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          question?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          caption: string | null
          category: string | null
          created_at: string | null
          file_name: string
          file_size_bytes: number | null
          file_type: string | null
          file_url: string
          height: number | null
          id: string
          is_public: boolean | null
          mime_type: string | null
          tags: string[] | null
          updated_at: string | null
          upload_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          file_name: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url: string
          height?: number | null
          id?: string
          is_public?: boolean | null
          mime_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          upload_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          category?: string | null
          created_at?: string | null
          file_name?: string
          file_size_bytes?: number | null
          file_type?: string | null
          file_url?: string
          height?: number | null
          id?: string
          is_public?: boolean | null
          mime_type?: string | null
          tags?: string[] | null
          updated_at?: string | null
          upload_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_library_upload_by_fkey"
            columns: ["upload_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_suggestions: {
        Row: {
          applied_at: string | null
          content_id: string
          content_improvements: string | null
          content_type: string | null
          created_at: string | null
          id: string
          internal_link_suggestions: string[] | null
          is_applied: boolean | null
          missing_sections: string[] | null
          original_content: string | null
          original_title: string | null
          suggested_description: string | null
          suggested_keywords: string[] | null
          suggested_title: string | null
          updated_at: string | null
        }
        Insert: {
          applied_at?: string | null
          content_id: string
          content_improvements?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          internal_link_suggestions?: string[] | null
          is_applied?: boolean | null
          missing_sections?: string[] | null
          original_content?: string | null
          original_title?: string | null
          suggested_description?: string | null
          suggested_keywords?: string[] | null
          suggested_title?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_at?: string | null
          content_id?: string
          content_improvements?: string | null
          content_type?: string | null
          created_at?: string | null
          id?: string
          internal_link_suggestions?: string[] | null
          is_applied?: boolean | null
          missing_sections?: string[] | null
          original_content?: string | null
          original_title?: string | null
          suggested_description?: string | null
          suggested_keywords?: string[] | null
          suggested_title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          copyright_text: string | null
          created_at: string | null
          dark_logo_url: string | null
          default_keywords: string[] | null
          default_meta_description: string | null
          default_meta_title: string | null
          default_og_image: string | null
          email_addresses: string[] | null
          emergency_contact: string | null
          facebook_pixel_code: string | null
          facebook_url: string | null
          favicon_url: string | null
          footer_banner_url: string | null
          footer_text: string | null
          google_analytics_code: string | null
          hero_image_url: string | null
          id: string
          instagram_url: string | null
          latitude: number | null
          linkedin_url: string | null
          logo_url: string | null
          longitude: number | null
          map_embed_link: string | null
          office_address: string | null
          phone_numbers: string[] | null
          tag_manager_code: string | null
          tiktok_url: string | null
          twitter_url: string | null
          updated_at: string | null
          viber: string | null
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          copyright_text?: string | null
          created_at?: string | null
          dark_logo_url?: string | null
          default_keywords?: string[] | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          default_og_image?: string | null
          email_addresses?: string[] | null
          emergency_contact?: string | null
          facebook_pixel_code?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          footer_banner_url?: string | null
          footer_text?: string | null
          google_analytics_code?: string | null
          hero_image_url?: string | null
          id?: string
          instagram_url?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          map_embed_link?: string | null
          office_address?: string | null
          phone_numbers?: string[] | null
          tag_manager_code?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          viber?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          copyright_text?: string | null
          created_at?: string | null
          dark_logo_url?: string | null
          default_keywords?: string[] | null
          default_meta_description?: string | null
          default_meta_title?: string | null
          default_og_image?: string | null
          email_addresses?: string[] | null
          emergency_contact?: string | null
          facebook_pixel_code?: string | null
          facebook_url?: string | null
          favicon_url?: string | null
          footer_banner_url?: string | null
          footer_text?: string | null
          google_analytics_code?: string | null
          hero_image_url?: string | null
          id?: string
          instagram_url?: string | null
          latitude?: number | null
          linkedin_url?: string | null
          logo_url?: string | null
          longitude?: number | null
          map_embed_link?: string | null
          office_address?: string | null
          phone_numbers?: string[] | null
          tag_manager_code?: string | null
          tiktok_url?: string | null
          twitter_url?: string | null
          updated_at?: string | null
          viber?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          role: string
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          role: string
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trek_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      trek_itineraries: {
        Row: {
          activities: string[] | null
          altitude: string | null
          created_at: string | null
          day_number: number
          description: string | null
          display_order: number | null
          distance: string | null
          id: string
          title: string
          trek_id: string
          updated_at: string | null
        }
        Insert: {
          activities?: string[] | null
          altitude?: string | null
          created_at?: string | null
          day_number: number
          description?: string | null
          display_order?: number | null
          distance?: string | null
          id?: string
          title: string
          trek_id: string
          updated_at?: string | null
        }
        Update: {
          activities?: string[] | null
          altitude?: string | null
          created_at?: string | null
          day_number?: number
          description?: string | null
          display_order?: number | null
          distance?: string | null
          id?: string
          title?: string
          trek_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trek_itineraries_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "featured_treks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trek_itineraries_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      trek_reviews: {
        Row: {
          author_email: string | null
          author_name: string
          created_at: string | null
          helpful_count: number | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          rating: number | null
          review_text: string | null
          trek_id: string
          updated_at: string | null
        }
        Insert: {
          author_email?: string | null
          author_name: string
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          review_text?: string | null
          trek_id: string
          updated_at?: string | null
        }
        Update: {
          author_email?: string | null
          author_name?: string
          created_at?: string | null
          helpful_count?: number | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          rating?: number | null
          review_text?: string | null
          trek_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trek_reviews_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "featured_treks_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trek_reviews_trek_id_fkey"
            columns: ["trek_id"]
            isOneToOne: false
            referencedRelation: "treks"
            referencedColumns: ["id"]
          },
        ]
      }
      treks: {
        Row: {
          available_months: number[] | null
          best_seasons: string[] | null
          category_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          difficulty: string | null
          duration: string | null
          excludes: string[] | null
          featured_image_url: string | null
          gallery_images: string[] | null
          highlights: string[] | null
          id: string
          includes: string[] | null
          is_featured: boolean | null
          is_published: boolean | null
          long_tail_keywords: string[] | null
          max_altitude: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          og_image_url: string | null
          price: number | null
          rating: number | null
          review_count: number | null
          schema_data: Json | null
          seo_keywords: string[] | null
          short_description: string | null
          slug: string
          twitter_image_url: string | null
          updated_at: string | null
        }
        Insert: {
          available_months?: number[] | null
          best_seasons?: string[] | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          excludes?: string[] | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          long_tail_keywords?: string[] | null
          max_altitude?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          og_image_url?: string | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          schema_data?: Json | null
          seo_keywords?: string[] | null
          short_description?: string | null
          slug: string
          twitter_image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          available_months?: number[] | null
          best_seasons?: string[] | null
          category_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          difficulty?: string | null
          duration?: string | null
          excludes?: string[] | null
          featured_image_url?: string | null
          gallery_images?: string[] | null
          highlights?: string[] | null
          id?: string
          includes?: string[] | null
          is_featured?: boolean | null
          is_published?: boolean | null
          long_tail_keywords?: string[] | null
          max_altitude?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          og_image_url?: string | null
          price?: number | null
          rating?: number | null
          review_count?: number | null
          schema_data?: Json | null
          seo_keywords?: string[] | null
          short_description?: string | null
          slug?: string
          twitter_image_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "treks_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "trek_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "treks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          is_active: boolean | null
          password_hash: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          password_hash: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          password_hash?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      featured_treks_view: {
        Row: {
          category_name: string | null
          category_slug: string | null
          difficulty: string | null
          duration: string | null
          featured_image_url: string | null
          id: string | null
          max_altitude: string | null
          name: string | null
          price: number | null
          rating: number | null
          review_count: number | null
          short_description: string | null
          slug: string | null
        }
        Relationships: []
      }
      published_blog_view: {
        Row: {
          category_name: string | null
          category_slug: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string | null
          published_at: string | null
          slug: string | null
          title: string | null
          view_count: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
