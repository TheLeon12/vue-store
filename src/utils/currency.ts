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