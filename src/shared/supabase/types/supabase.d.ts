export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      alert_message: {
        Row: {
          created_at: string;
          id: number;
          message: string | null;
          status: boolean | null;
          target_id: string | null;
          type: string | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message?: string | null;
          status?: boolean | null;
          target_id?: string | null;
          type?: string | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string | null;
          status?: boolean | null;
          target_id?: string | null;
          type?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'alert_message_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      chat: {
        Row: {
          chat_list_id: number | null;
          content: string | null;
          created_at: string;
          id: number;
          read_status: boolean | null;
          user_id: string | null;
        };
        Insert: {
          chat_list_id?: number | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          read_status?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          chat_list_id?: number | null;
          content?: string | null;
          created_at?: string;
          id?: number;
          read_status?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_chat_list_id_fkey';
            columns: ['chat_list_id'];
            isOneToOne: false;
            referencedRelation: 'chat_list';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      chat_list: {
        Row: {
          id: number;
          post_id: number;
        };
        Insert: {
          id?: number;
          post_id: number;
        };
        Update: {
          id?: number;
          post_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_list_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'used_item';
            referencedColumns: ['id'];
          }
        ];
      };
      location: {
        Row: {
          address: string | null;
          id: number;
          latitude: string | null;
          longitude: string | null;
          place_name: string;
          post_id: number | null;
        };
        Insert: {
          address?: string | null;
          id?: number;
          latitude?: string | null;
          longitude?: string | null;
          place_name: string;
          post_id?: number | null;
        };
        Update: {
          address?: string | null;
          id?: number;
          latitude?: string | null;
          longitude?: string | null;
          place_name?: string;
          post_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'location_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'used_item';
            referencedColumns: ['id'];
          }
        ];
      };
      main_category: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      mung_stagram: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          photo_url: string[] | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          photo_url?: string[] | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          photo_url?: string[] | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'mung_stagram_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      mung_stagram_like: {
        Row: {
          id: number;
          target_id: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          target_id: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          target_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'mung_stagram_like_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'mung_stagram';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'mung_stagram_like_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          id: string;
          user_name: string;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          id?: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          id?: string;
          user_name?: string;
        };
        Relationships: [];
      };
      sub_category: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      used_item: {
        Row: {
          content: string | null;
          created_at: string;
          id: number;
          main_category_id: number | null;
          photo_url: string[] | null;
          price: string | null;
          sold_out: boolean | null;
          sub_category_id: number | null;
          title: string | null;
          user_id: string | null;
        };
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: number;
          main_category_id?: number | null;
          photo_url?: string[] | null;
          price?: string | null;
          sold_out?: boolean | null;
          sub_category_id?: number | null;
          title?: string | null;
          user_id?: string | null;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: number;
          main_category_id?: number | null;
          photo_url?: string[] | null;
          price?: string | null;
          sold_out?: boolean | null;
          sub_category_id?: number | null;
          title?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'used_item_main_category_id_fkey';
            columns: ['main_category_id'];
            isOneToOne: false;
            referencedRelation: 'main_category';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'used_item_sub_category_id_fkey';
            columns: ['sub_category_id'];
            isOneToOne: false;
            referencedRelation: 'sub_category';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'used_item_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      used_item_wish: {
        Row: {
          id: number;
          target_id: number;
          user_id: string | null;
        };
        Insert: {
          id?: number;
          target_id: number;
          user_id?: string | null;
        };
        Update: {
          id?: number;
          target_id?: number;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'used_item_wish_target_id_fkey';
            columns: ['target_id'];
            isOneToOne: false;
            referencedRelation: 'used_item';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'used_item_wish_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] & Database['public']['Views'])
    ? (Database['public']['Tables'] & Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof Database['public']['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof Database['public']['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
