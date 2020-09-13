export const pathToString = (path: any, rootPath?: string): string => {
  const fieldPath = Array.isArray(path)
    ? path
      .map(value => (Number.isInteger(value) ? `[${value as string}]` : value))
      .join()
      .replace(/,\[/, '[')
      .replace(/,/, '.')
    : path

  return rootPath === undefined
    ? fieldPath
    : `${rootPath}.${fieldPath as string}`
}
