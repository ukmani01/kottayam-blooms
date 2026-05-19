export interface Product {
  id: number;
  price: number;
  image: string;
  description: string;
  category: string;
  badge?: string;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem extends Product { quantity?: number; }
export type CategoryType = 'All' | 'Roses' | 'Wedding' | 'Birthday' | 'Gifts' | 'Anniversary' | 'Sympathy';
