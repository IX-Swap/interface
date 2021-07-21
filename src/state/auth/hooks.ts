import { useFetchToken } from 'hooks/useFetchToken'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { setUsesSecTokens } from 'state/user/actions'
import { useUsesSecTokens } from 'state/user/hooks'
import { getTokenExpiration, shouldRenewToken } from 'utils/time'
import { RawAuthPayload, saveToken } from './actions'

export function useAuthState(): AppState['auth'] {
  return useSelector<AppState, AppState['auth']>((state) => state.auth)
}

export function useSaveAuthorization() {
  const dispatch = useDispatch<AppDispatch>()

  const saveAuthorization = (auth: RawAuthPayload) => {
    const expirationTime = getTokenExpiration(auth.expiresIn)
    dispatch(saveToken({ value: { token: auth.accessToken, expiresAt: expirationTime } }))
  }
  return { saveAuthorization }
}

export function useAuthToken() {
  const { token, expiresAt } = useAuthState()
  const { saveAuthorization } = useSaveAuthorization()
  const { fetchToken } = useFetchToken()
  const getToken = useCallback(async () => {
    if (!token || shouldRenewToken(expiresAt ?? 0)) {
      const authData = await fetchToken()
      if (authData) {
        saveAuthorization(authData)
      }
    }
  }, [expiresAt, token, fetchToken, saveAuthorization])
  return { getToken }
}

export const useLogin = () => {
  const { account } = useActiveWeb3React()
  const usesSecTokens = useUsesSecTokens()
  const { getToken } = useAuthToken()

  useEffect(() => {
    if (account && usesSecTokens) {
      getToken()
    }
  }, [account, usesSecTokens, getToken])
}

export const useFirstLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(() => {
    dispatch(setUsesSecTokens({ usesTokens: true }))
  }, [dispatch])
}
