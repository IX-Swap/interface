import { useFetchToken } from 'hooks/useFetchToken'
import { useActiveWeb3React } from 'hooks/web3'
import md5 from 'md5'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { clearEventLog } from 'state/eventLog/actions'
import { clearUserData, saveAccount } from 'state/user/actions'
import { logout, postLogin } from './actions'

export enum LOGIN_STATUS {
  NO_ACCOUNT,
  SUCCESS,
  FAILED,
}

export function useAuthState(): AppState['auth'] {
  return useSelector<AppState, AppState['auth']>((state) => state.auth)
}

export function useHasLogin() {
  const { account } = useActiveWeb3React()
  const getHasLogin = useCallback(
    async (externalAccount?: string | null) => {
      if (account || externalAccount) {
        const hash = md5((account ?? externalAccount ?? '').toLowerCase())
        const { data } = await apiService.get(metamask.hasLogged(hash))
        return data
      }
      return false
    },
    [account]
  )
  return getHasLogin
}

export function useUserisLoggedIn() {
  const { token } = useAuthState()
  return useMemo(() => {
    return !!token
  }, [token])
}

const awaitDispatch = (dispatch: any, action: any) =>
  new Promise((resolve, reject) => {
    dispatch(action())
    resolve(null)
  })

export function useLogout() {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async () => {
    awaitDispatch(dispatch, logout)
    dispatch(clearUserData())
    dispatch(clearEventLog())
  }, [])
}

export function useLogin({ mustHavePreviousLogin = true }: { mustHavePreviousLogin?: boolean; caller?: string }) {
  const { loginLoading } = useAuthState()
  const dispatch = useDispatch<AppDispatch>()
  const { fetchToken } = useFetchToken()
  const getHasLogin = useHasLogin()
  const isLoggedIn = useUserisLoggedIn()
  const { account } = useActiveWeb3React()
  const checkLogin = useCallback(
    async (expireLogin = false) => {
      if (loginLoading && !account) {
        return
      }
      if (isLoggedIn && !expireLogin) {
        return LOGIN_STATUS.SUCCESS
      }
      try {
        dispatch(postLogin.pending())
        // gets here if he has no login at all, or login is forced
        if (mustHavePreviousLogin) {
          // gets here if he needs to be previously logged in
          const hasLogin = await getHasLogin(account)
          if (!hasLogin) {
            if (account) {
              dispatch(postLogin.rejected({ errorMessage: 'User has no account' }))
              dispatch(saveAccount({ account }))
            }
            return LOGIN_STATUS.NO_ACCOUNT
          }
        }
        // gets here if previously logged in or previous login not needed
        const auth = await fetchToken()

        if (!auth) {
          dispatch(saveAccount({ account: '' }))
          dispatch(postLogin.rejected({ errorMessage: 'Could not login' }))
          return LOGIN_STATUS.FAILED
        } else {
          dispatch(saveAccount({ account: account ?? '' }))
          dispatch(postLogin.fulfilled({ auth }))
          return LOGIN_STATUS.SUCCESS
        }
      } catch (error: any) {
        dispatch(postLogin.rejected({ errorMessage: error.message }))
        dispatch(saveAccount({ account: '' }))
        return LOGIN_STATUS.FAILED
      }
    },
    [fetchToken, dispatch, getHasLogin, mustHavePreviousLogin, account, isLoggedIn, loginLoading]
  )
  return checkLogin
}
