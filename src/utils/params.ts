export interface PopulateParamsArg {
  url: string
  field: string
  value: string
}
export const populatePath = ({ url, field, value }: PopulateParamsArg) => {
  return url.replace(`:${field}`, value)
}
