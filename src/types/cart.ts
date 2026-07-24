import type { Product } from '@/types/product'

export interface CartItem {
  product: Product
  quantity: number
}

export interface AddToCartPayload {
  product: Product
  quantity: number
}