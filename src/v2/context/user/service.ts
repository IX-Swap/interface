import { postRequest } from '../../helpers/httpRequests'
import localStore from '../../helpers/storageHelper'
import User from '../../types/user'
import HTTPResponse from '../../types/httpResponse'
export async function loginUser (email: string, password: string, otp?: string): Promise<HTTPResponse<User>> {
  try {
    const uri = '/auth/sign-in'
    const result = await postRequest(uri, { email, password, otp })
    const response = await result.json()
    if (result.status === 200) {
      const {
        email,
        roles,
        _id,
        name,
        accessToken,
        verified,
        totpConfirmed,
        accountType
      } = response.data
      const user = {
        _id,
        email,
        roles,
        name,
        totpConfirmed,
        verified,
        accessToken,
        accountType
      }

      localStore.set(user)
      localStore.store('visitedUrl', [])
      return new HTTPResponse<User>(true, user)
    } else {
      return new HTTPResponse<User>(false, undefined, response.message)
    }
  } catch (err) {
    console.log(err)
    console.log(err.response)
    return new HTTPResponse<User>(false, undefined, 'Login Failed')
  }
}
