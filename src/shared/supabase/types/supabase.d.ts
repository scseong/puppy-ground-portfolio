export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      alert_message: {
        Row: {
          created_at: string;
          id: number;
          message: string;
          status: boolean;
          target_id: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          message: string;
          status?: boolean;
          target_id: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          message?: string;
          status?: boolean;
          target_id?: string;
          type?: string;
          user_id?: string;
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
          chat_list_id: number;
          content: string;
          created_at: string;
          id: number;
          read_status: boolean;
          user_id: string;
          user_name: string;
        };
        Insert: {
          chat_list_id: number;
          content: string;
          created_at?: string;
          id?: number;
          read_status?: boolean;
          user_id: string;
          user_name: string;
        };
        Update: {
          chat_list_id?: number;
          content?: string;
          created_at?: string;
          id?: number;
          read_status?: boolean;
          user_id?: string;
          user_name?: string;
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
          user_id: string;
        };
        Insert: {
          id?: number;
          post_id: number;
          user_id: string;
        };
        Update: {
          id?: number;
          post_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_list_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'used_item';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_list_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          }
        ];
      };
      facilities: {
        Row: {
          address: string;
          category: string;
          county: string;
          explanation: string;
          facilities_name: string;
          holiday: string;
          id: number;
          latitude: string;
          longitude: string;
          open_time: string;
          url: string;
        };
        Insert: {
          address: string;
          category: string;
          county: string;
          explanation: string;
          facilities_name: string;
          holiday: string;
          id?: number;
          latitude: string;
          longitude: string;
          open_time: string;
          url: string;
        };
        Update: {
          address?: string;
          category?: string;
          county?: string;
          explanation?: string;
          facilities_name?: string;
          holiday?: string;
          id?: number;
          latitude?: string;
          longitude?: string;
          open_time?: string;
          url?: string;
        };
        Relationships: [];
      };
      main_category: {
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
      mung_stagram: {
        Row: {
          content: string;
          created_at: string;
          id: number;
          photo_url: string[];
          title: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: number;
          photo_url: string[];
          title: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: number;
          photo_url?: string[];
          title?: string;
          user_id?: string;
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
          user_id: string;
        };
        Insert: {
          id?: number;
          target_id: number;
          user_id: string;
        };
        Update: {
          id?: number;
          target_id?: number;
          user_id?: string;
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
          email: string;
          id: string;
          user_name: string;
        };
        Insert: {
          avatar_url?: string | null;
          email: string;
          id?: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string | null;
          email?: string;
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
          address: string;
          content: string;
          created_at: string;
          id: number;
          latitude: string;
          longitude: string;
          main_category_id: number;
          photo_url: string[];
          place_name: string;
          price: number;
          sold_out: boolean;
          sub_category_id: number;
          title: string;
          user_id: string;
        };
        Insert: {
          address: string;
          content: string;
          created_at?: string;
          id?: number;
          latitude: string;
          longitude: string;
          main_category_id: number;
          photo_url: string[];
          place_name: string;
          price: number;
          sold_out?: boolean;
          sub_category_id: number;
          title: string;
          user_id: string;
        };
        Update: {
          address?: string;
          content?: string;
          created_at?: string;
          id?: number;
          latitude?: string;
          longitude?: string;
          main_category_id?: number;
          photo_url?: string[];
          place_name?: string;
          price?: number;
          sold_out?: boolean;
          sub_category_id?: number;
          title?: string;
          user_id?: string;
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
          user_id: string;
        };
        Insert: {
          id?: number;
          target_id: number;
          user_id: string;
        };
        Update: {
          id?: number;
          target_id?: number;
          user_id?: string;
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
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
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

