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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      alert_message: {
        Row: {
          created_at: string
          id: string
          message: string
          status: boolean
          target_id: number
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: boolean
          target_id: number
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: boolean
          target_id?: number
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "alert_message_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat: {
        Row: {
          chat_list_id: number
          content: string
          created_at: string
          id: number
          read_status: boolean
          user_id: string
        }
        Insert: {
          chat_list_id: number
          content: string
          created_at?: string
          id?: number
          read_status?: boolean
          user_id: string
        }
        Update: {
          chat_list_id?: number
          content?: string
          created_at?: string
          id?: number
          read_status?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_chat_list_id_fkey"
            columns: ["chat_list_id"]
            isOneToOne: false
            referencedRelation: "chat_list"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_list: {
        Row: {
          get_out_chat_room: string[] | null
          id: number
          other_user: string
          post_id: number
          user_id: string
        }
        Insert: {
          get_out_chat_room?: string[] | null
          id?: number
          other_user: string
          post_id: number
          user_id: string
        }
        Update: {
          get_out_chat_room?: string[] | null
          id?: number
          other_user?: string
          post_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_list_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "used_item"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_list_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      facilities: {
        Row: {
          address: string
          category: string
          county: string
          explanation: string
          facilities_name: string
          holiday: string
          id: number
          latitude: number
          longitude: number
          open_time: string
          url: string
        }
        Insert: {
          address: string
          category: string
          county: string
          explanation: string
          facilities_name: string
          holiday: string
          id?: number
          latitude: number
          longitude: number
          open_time: string
          url: string
        }
        Update: {
          address?: string
          category?: string
          county?: string
          explanation?: string
          facilities_name?: string
          holiday?: string
          id?: number
          latitude?: number
          longitude?: number
          open_time?: string
          url?: string
        }
        Relationships: []
      }
      main_category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      mung_stagram: {
        Row: {
          content: string
          created_at: string
          id: number
          photo_url: string[]
          tags: string[]
          title: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          photo_url: string[]
          tags: string[]
          title: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          photo_url?: string[]
          tags?: string[]
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mung_stagram_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mung_stagram_comment: {
        Row: {
          content: string
          created_at: string
          id: number
          mung_stagram_id: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          mung_stagram_id: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          mung_stagram_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mung_stagram_comment_mung_stagram_id_fkey"
            columns: ["mung_stagram_id"]
            isOneToOne: false
            referencedRelation: "mung_stagram"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mung_stagram_comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mung_stagram_like: {
        Row: {
          id: number
          target_id: number
          user_id: string
        }
        Insert: {
          id?: number
          target_id: number
          user_id: string
        }
        Update: {
          id?: number
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "mung_stagram_like_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "mung_stagram"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          email: string
          id: string
          user_name: string
        }
        Insert: {
          avatar_url?: string | null
          email: string
          id: string
          user_name: string
        }
        Update: {
          avatar_url?: string | null
          email?: string
          id?: string
          user_name?: string
        }
        Relationships: []
      }
      sub_category: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      used_item: {
        Row: {
          address: string
          content: string
          created_at: string
          id: number
          latitude: number
          longitude: number
          main_category_id: number
          photo_url: string[]
          place_name: string
          price: number
          sold_out: boolean
          sub_category_id: number
          title: string
          user_id: string
        }
        Insert: {
          address: string
          content: string
          created_at?: string
          id?: number
          latitude: number
          longitude: number
          main_category_id: number
          photo_url: string[]
          place_name: string
          price: number
          sold_out?: boolean
          sub_category_id: number
          title: string
          user_id: string
        }
        Update: {
          address?: string
          content?: string
          created_at?: string
          id?: number
          latitude?: number
          longitude?: number
          main_category_id?: number
          photo_url?: string[]
          place_name?: string
          price?: number
          sold_out?: boolean
          sub_category_id?: number
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "used_item_main_category_id_fkey"
            columns: ["main_category_id"]
            isOneToOne: false
            referencedRelation: "main_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "used_item_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "used_item_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      used_item_wish: {
        Row: {
          id: number
          target_id: number
          user_id: string
        }
        Insert: {
          id?: number
          target_id: number
          user_id: string
        }
        Update: {
          id?: number
          target_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "used_item_wish_target_id_fkey"
            columns: ["target_id"]
            isOneToOne: false
            referencedRelation: "used_item"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_prev_and_next_dev: {
        Args: { target_id: number }
        Returns: {
          next_id: number
          prev_id: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
