import HttpResponse from '../../types/httpResponse'
import { IndividualIdentity, CorporateIdentity } from '../../types/identity'
import { getRequest, postRequest } from '../../helpers/httpRequests'

export async function getIndividualIdentity (
  id: string
): Promise<HttpResponse<IndividualIdentity>> {
  try {
    const individualUri = `/identity/individuals/${id}`

    const result = await getRequest(individualUri)
    const response = await result.json()
    if (result.status === 200) {
      const user = response.data
      console.log(user)
      return new HttpResponse<IndividualIdentity>(true, user)
    } else {
      return new HttpResponse<IndividualIdentity>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HttpResponse<IndividualIdentity>(
      false,
      undefined,
      'Login Failed'
    )
  }
}

export async function getCorporateIdentities (
  id: string,
  uri?: string
): Promise<HttpResponse<CorporateIdentity[]>> {
  try {
    const corporatesUri = uri ?? `/identity/corporates/${id}/list`

    const result = await postRequest(corporatesUri, { skip: 0, limit: 50 })
    const response = await result.json()
    if (result.status === 200) {
      const user = response.data[0].documents
      return new HttpResponse<CorporateIdentity[]>(true, user)
    } else {
      return new HttpResponse<CorporateIdentity[]>(
        false,
        undefined,
        response.message
      )
    }
  } catch (err) {
    return new HttpResponse<CorporateIdentity[]>(
      false,
      undefined,
      'Login Failed'
    )
  }
}

/*
try {
    const individualUri = '/identity/profile/individual';

    const result = await getRequest(individualUri);
    const response = await result.json();

    if (result.status === 200) {
      dispatch({
        type: actions.GET_IDENTITY_SUCCESS,
        payload: {
          identity: response.data,
          shouldCreateNew:
            response.message === 'shouldCreateNew' ? true : false,
        },
      });
    } else {
      throw new Error(response.message);
    }
  } catch (err) {
    const errMsg = err.message || err.toString() || 'Loading profile failed.';
    dispatch({ type: actions.GET_IDENTITY_FAILURE, payload: errMsg });
    throw new Error(errMsg);
  }
  */
