export function formatNumber(num: number): string {
  const str = num.toLocaleString('fr')
  return str.replace(/,/, '.')
}
