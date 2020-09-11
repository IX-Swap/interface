export const pathToString = (path: any): string => {
  return Array.isArray(path)
    ? path
      .map(value => (Number.isInteger(value) ? `[${value as string}]` : value))
      .join()
      .replace(/,\[/, '[')
      .replace(/,/, '.')
    : path
}
