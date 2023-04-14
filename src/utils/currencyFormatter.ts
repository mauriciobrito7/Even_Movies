export const formatCurrency = (
 locale: string,
 currency: string,
 amount: number,
 minimumFractionDigits = 0
) =>
 new Intl.NumberFormat(locale, {
  style: 'currency',
  currency: `${currency}`,
  minimumFractionDigits: minimumFractionDigits,
 }).format(amount);
