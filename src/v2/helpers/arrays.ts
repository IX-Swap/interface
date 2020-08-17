export const arrToOpts = <T extends any>(
  arr: T[]
): Array<{ value: T; label: string }> => {
  return arr.map(value => ({ value, label: `${value as string}` }))
}
