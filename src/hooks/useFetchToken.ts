import { useCallback } from 'react'
import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { login } from './login'
import { sign } from './personalSign'
import { useActiveWeb3React } from './web3'

interface Hash {
  hash: string
}
export const useFetchToken = () => {
  const { account, library } = useActiveWeb3React()
  const fetchToken = useCallback(async () => {
    if (account) {
      try {
        const { data } = await apiService.post<Hash>(metamask.challenge, { address: account })
        if (data.hash) {
          const result = await sign({ hash: data.hash, account, library })
          if (result) {
            const loginData = await login({ hash: result, account })
            if (loginData) {
              return loginData.data
            }
          }
        }
      } catch (e) {
        console.log({ ERROR: e })
      }
    }
    return null
  }, [account, library])
  return { fetchToken }
}
