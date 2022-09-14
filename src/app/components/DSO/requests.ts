import { DSOBaseFormValues } from 'types/dso'

export const getDSOInformationRequestPayload = (data: DSOBaseFormValues) => {
  return {
    ...data
  }
}
