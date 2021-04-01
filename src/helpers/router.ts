export const safeGeneratePath = (path: string, params: any) => {
  if (params === undefined || params === null) {
    return path
  }

  return Object.keys(params).length !== 0
    ? Object.keys(params).reduce(
        (path, param) => path.replace(`:${param}`, params[param]),
        path
      )
    : path
}
