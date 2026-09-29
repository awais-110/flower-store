export function formatPrice(amount: number, currencyCode = "PKR"): string {
  const safeAmount = Number.isFinite(amount) ? amount : 0
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: safeAmount % 100 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(safeAmount / 100)
}