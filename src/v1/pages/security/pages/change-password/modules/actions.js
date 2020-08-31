import { postRequest } from 'v1/services/httpRequests'
import localStore from 'v1/services/storageHelper'

export const requestChangePassword = async ({
  oldPassword,
  newPassword
}: {
  oldPassword: string,
  newPassword: string
}) => {
  try {
    const url = `/auth/password/change/${localStore.getUserId()}`
    const result = await postRequest(url, { oldPassword, newPassword })
    const response = await result.json()

    if (result.status !== 200) {
      return { error: response.message }
    }

    return { error: null }
  } catch (err) {
    return { error: err }
  }
}
