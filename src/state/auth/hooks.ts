import { useFetchToken } from 'hooks/useFetchToken'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
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
