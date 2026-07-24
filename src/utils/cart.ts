import {
  calculateDiscountedPrice,
  roundCurrency,
} from '@/utils/currency'

import type { CartItem } from '@/types/cart'

export function getCartItemUnitPrice(item: CartItem): number {
  return roundCurrency(
    calculateDiscountedPrice(
      item.product.price,
      item.product.discountPercentage,
    ),
  )
}

export function getCartItemOriginalSubtotal(
  item: CartItem,
): number {
  return roundCurrency(item.product.price * item.quantity)
}

export function getCartItemSubtotal(item: CartItem): number {
  return roundCurrency(
    getCartItemUnitPrice(item) * item.quantity,
  )
}

export function getCartItemDiscount(item: CartItem): number {
  return roundCurrency(
    getCartItemOriginalSubtotal(item) -
      getCartItemSubtotal(item),
  )
}

export function calculateCartOriginalSubtotal(
  items: CartItem[],
): number {
  return roundCurrency(
    items.reduce((total, item) => {
      return total + getCartItemOriginalSubtotal(item)
    }, 0),
  )
}

export function calculateCartDiscount(
  items: CartItem[],
): number {
  return roundCurrency(
    items.reduce((total, item) => {
      return total + getCartItemDiscount(item)
    }, 0),
  )
}

export function calculateCartTotal(
  items: CartItem[],
): number {
  return roundCurrency(
    items.reduce((total, item) => {
      return total + getCartItemSubtotal(item)
    }, 0),
  )
}