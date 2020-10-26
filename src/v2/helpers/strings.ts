interface GetIdFromObjProps extends Record<string, any> {
  _id?: string
}

export const getIdFromObj = (value?: GetIdFromObjProps | null): string =>
  value?._id ?? ''

export const isEmptyString = (value: string | null | undefined) =>
  value?.length === 0
