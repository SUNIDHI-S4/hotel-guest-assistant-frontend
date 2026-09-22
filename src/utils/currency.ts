// The backend's prices are plain numbers with no currency (see README → Configuration →
// CURRENCY_SYMBOL). It defaults to ₹, so that is what we format with here.
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}
