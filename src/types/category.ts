export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  product_count?: number | null;
  created_at?: string;
  updated_at?: string;
}

export type CategoriesResponse = Category[];
