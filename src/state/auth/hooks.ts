import { useFetchToken } from 'hooks/useFetchToken'
import { useActiveWeb3React } from 'hooks/web3'
import md5 from 'md5'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { metamask } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { shouldRenewToken } from 'utils/time'
import { postLogin } from './actions'

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

export function useLogin({
  expireLogin = false,
  mustHavePreviousLogin = true,
}: {
  expireLogin?: boolean
  mustHavePreviousLogin?: boolean
  caller?: string
}) {
  const { expiresAt, loginLoading } = useAuthState()
  const dispatch = useDispatch<AppDispatch>()
  const { fetchToken } = useFetchToken()
  const getHasLogin = useHasLogin()
  const checkLogin = useCallback(
    async (account?: string | null) => {
      if (loginLoading) {
        return
      }
      try {
        if (expireLogin || shouldRenewToken(expiresAt ?? 0)) {
          // gets here if he has no login at all, login expired, or login is forced
          if (mustHavePreviousLogin) {
            // gets here if he needs to be previously logged in
            const hasLogin = await getHasLogin(account)
            if (!hasLogin) {
              return LOGIN_STATUS.NO_ACCOUNT
            }
          }
          dispatch(postLogin.pending())
          // gets here if previously logged in or previous login not needed
          const auth = await fetchToken()

          if (!auth) {
            console.log({ ERROR70: 'no auth' })
            dispatch(postLogin.rejected({ errorMessage: 'Could not login.' }))
            return LOGIN_STATUS.FAILED
          } else {
            dispatch(postLogin.fulfilled({ auth }))
            return LOGIN_STATUS.SUCCESS
          }
        } else {
          return LOGIN_STATUS.SUCCESS
        }
      } catch (error: any) {
        console.log({ ERROR80: error })
        dispatch(postLogin.rejected({ errorMessage: 'Could not login.' }))
        return LOGIN_STATUS.FAILED
      }
    },
    [expiresAt, fetchToken, dispatch, getHasLogin, expireLogin, mustHavePreviousLogin]
  )
  return checkLogin
}
