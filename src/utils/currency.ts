export function formatCurrency(
  value: number,
  currency = 'USD',
  locale = 'es-DO',
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

export function calculateDiscountedPrice(
  price: number,
  discountPercentage: number,
): number {
  if (discountPercentage <= 0) {
    return price
  }

  const discount = price * (discountPercentage / 100)

  return price - discount
}

export function roundCurrency(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100
}
