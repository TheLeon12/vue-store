export function formatCategoryName(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}
