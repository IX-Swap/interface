export const pathToString = (path: any): string => {
  return Array.isArray(path) ? path.join().replace(/,/, '.') : path
}
