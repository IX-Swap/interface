export function formatNumber(num: number): string {
  return num.toLocaleString('fr')
}

export function removeSciNotation(num: number): string {
  if (/e-/.test(num.toString())) {
    const toFixedNumber = Number.parseInt(num.toString().split('-')[1])
    return num.toFixed(toFixedNumber)
  }
  return num.toString()
}
