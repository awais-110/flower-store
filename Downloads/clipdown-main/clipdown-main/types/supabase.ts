export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      downloads: {
        Row: {
          id: string;
          platform: string;
          url_hash: string;
          quality: string | null;
          format: string | null;
          ip_hash: string | null;
          created_at: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content: string;
          excerpt: string | null;
          meta_title: string | null;
          meta_description: string | null;
          published: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      settings: {
        Row: {
          key: string;
          value: Json | null;
          updated_at: string | null;
        };
      };
      rate_limits: {
        Row: {
          ip_hash: string;
          endpoint: string;
          requests: number | null;
          window_start: string | null;
        };
      };
    };
  };
};
