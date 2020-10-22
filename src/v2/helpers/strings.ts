interface GetIdFromObjProps extends Record<string, any> {
  _id?: string
}

export const getIdFromObj = (value?: GetIdFromObjProps | null): string =>
  value?._id ?? ''
