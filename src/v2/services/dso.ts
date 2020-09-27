import HttpResponse from '../types/httpResponse'
import { DigitalSecurityOffering, DSORequestArgs } from '../types/dso'
import { postRequest, putRequest } from '../helpers/httpRequests'

export async function saveDso (
  request: DSORequestArgs,
  userId: string
): Promise<HttpResponse<DigitalSecurityOffering>> {
  try {
    const uri = `/issuance/dso/${userId}`

    const result = await postRequest(uri, request)
    const response = await result.json()
    if (result.status === 200) {
      const dso = response.data
      return new HttpResponse<DigitalSecurityOffering>(true, dso)
    } else {
      return new HttpResponse<DigitalSecurityOffering>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    return new HttpResponse<DigitalSecurityOffering>(
      false,
      undefined,
      'Unable to save Dso'
    )
  }
}

export async function editDso (
  dsoId: string,
  request: DSORequestArgs,
  userId: string
): Promise<HttpResponse<DigitalSecurityOffering>> {
  try {
    const uri = `/issuance/dso/${userId}/${dsoId}`

    const result = await putRequest(uri, request)
    const response = await result.json()
    if (result.status === 200) {
      const dso = response.data
      return new HttpResponse<DigitalSecurityOffering>(true, dso)
    } else {
      return new HttpResponse<DigitalSecurityOffering>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    return new HttpResponse<DigitalSecurityOffering>(
      false,
      undefined,
      'Unable to save Dso'
    )
  }
}
