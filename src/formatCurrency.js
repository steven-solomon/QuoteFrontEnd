export function formatCurrency (value) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 1 }).format(value)
}