export const arrToOpts = <T extends any>(
  arr: T[]
): Array<{ value: T; label: string }> => {
  return arr.map(value => ({ value, label: `${value as string}` }))
}

export const isNonEmptyArray = (arr: any[] | undefined) => {
  return arr !== undefined && arr.length >= 1
}
