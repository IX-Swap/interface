import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { RawAuthPayload } from 'state/auth/actions'

interface Props {
  hash?: string
  account?: string | null
}

export const login = async ({ hash, account }: Props) => {
  if (hash && account) {
    try {
      const result = await apiService.post<RawAuthPayload>(metamask.login, {
        address: account,
        hash,
      })
      return result
    } catch (e) {
      console.error({ ERROR19: e })
    }
  }
  return null
}
