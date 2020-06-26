import HttpResponse from '../types/httpResponse'
import { Dso, DsoRequest } from '../types/dso'
import { postRequest, putRequest } from '../helpers/httpRequests'

export async function saveDso (request: DsoRequest, userId: string): Promise<HttpResponse<Dso>> {
  try {
    const uri = `/issuance/dso/${userId}`

    const result = await postRequest(uri, request)
    const response = await result.json()
    if (result.status === 200) {
      const dso = response.data
      return new HttpResponse<Dso>(true, dso)
    } else {
      return new HttpResponse<Dso>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    return new HttpResponse<Dso>(
      false,
      undefined,
      'Unable to save Dso'
    )
  }
}

export async function editDso (dsoId: string, request: DsoRequest, userId: string): Promise<HttpResponse<Dso>> {
  try {
    const uri = `/issuance/dso/${userId}/${dsoId}`

    const result = await putRequest(uri, request)
    const response = await result.json()
    if (result.status === 200) {
      const dso = response.data
      return new HttpResponse<Dso>(true, dso)
    } else {
      return new HttpResponse<Dso>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    return new HttpResponse<Dso>(
      false,
      undefined,
      'Unable to save Dso'
    )
  }
}
