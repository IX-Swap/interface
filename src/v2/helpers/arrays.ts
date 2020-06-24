export const arrToOpts = <T extends{}>(arr: T[]): Array<{ value: T, label: string }> => {
  return arr.map((value) => ({ value, label: `${value}` }))
}
