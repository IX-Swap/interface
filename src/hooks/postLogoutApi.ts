import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'

export const postLogoutApi = async () => {
  try {
    const result = await apiService.post<any>(metamask.logout, {})
    return result
  } catch (e) {
    console.error({ ERROR19: e })
  }
}
