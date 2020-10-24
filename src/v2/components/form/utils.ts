export const pathToString = (path: any, rootPath?: string): string => {
  const fieldPath = Array.isArray(path)
    ? path
        .map(value =>
          Number.isInteger(value) ? `[${value as string}]` : value
        )
        .join('.')
        .replace(/.\[/, '[')
    : path

  return rootPath === undefined
    ? fieldPath
    : `${rootPath}.${fieldPath as string}`
}

export const hasValue = (value: any) => {
  return value !== null || value !== undefined || value !== ''
}
