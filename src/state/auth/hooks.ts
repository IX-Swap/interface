import { useFetchAccessToken } from 'hooks/useFetchAccessToken'
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
import { useDisconnect } from 'wagmi'
import { setWalletState } from 'state/wallet'
import { useHistory } from 'react-router-dom'
import { routes } from 'utils/routes'

export enum LOGIN_STATUS {
  NO_ACCOUNT,
  SUCCESS,
  FAILED,
}

type AuthState = Omit<AppState['auth'], 'token' | 'refreshToken'> & {
  token?: string
  refreshToken?: string
}

export function useAuthState(): AuthState {
  const data = useSelector<AppState, AppState['auth']>((state) => state.auth)
  const { account } = useActiveWeb3React()

  return { ...data, token: data.token?.[account ?? ''], refreshToken: data.refreshToken?.[account ?? ''] }
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

export function useLogout() {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const { disconnect } = useDisconnect()
  const history = useHistory()

  const disconnectWallet = () => {
    history.replace(routes.defaultRoute)
    disconnect()
    dispatch(postLogin.rejected({ errorMessage: 'User logged out', account: '' }))
    dispatch(logout(account))
    dispatch(setWalletState({ isConnected: false, walletName: '', isSignLoading: false }))
    dispatch(clearUserData())
    dispatch(clearEventLog())
    indexedDB?.deleteDatabase('WALLET_CONNECT_V2_INDEXED_DB')
  }

  return { disconnectWallet }
}

export function useLogin({ mustHavePreviousLogin = true }: { mustHavePreviousLogin?: boolean; caller?: string }) {
  const { loginLoading } = useAuthState()
  const dispatch = useDispatch<AppDispatch>()
  const { fetchAccessToken } = useFetchAccessToken()
  const getHasLogin = useHasLogin()
  const isLoggedIn = useUserisLoggedIn()
  const { account } = useActiveWeb3React()

  const checkLogin = async (expireLogin = false) => {
    if (loginLoading && !account) {
      return
    }
    if (isLoggedIn && !expireLogin) {
      return LOGIN_STATUS.SUCCESS
    }

    try {
      dispatch(postLogin.pending(account))
      // gets here if he has no login at all, or login is forced
      if (mustHavePreviousLogin) {
        // gets here if he needs to be previously logged in
        const hasLogin = await getHasLogin(account)

        if (!hasLogin) {
          dispatch(postLogin.rejected({ errorMessage: 'User has no account', account }))
          dispatch(saveAccount({ account: '' }))
        }
      }
      // gets here if previously logged in or previous login not needed
      const auth = await fetchAccessToken()

      if (!auth) {
        dispatch(saveAccount({ account: '' }))
        dispatch(postLogin.rejected({ errorMessage: 'Could not login', account }))
        return LOGIN_STATUS.FAILED
      } else {
        dispatch(saveAccount({ account: account ?? '' }))
        dispatch(postLogin.fulfilled({ auth, account }))
        return LOGIN_STATUS.SUCCESS
      }
    } catch (error: any) {
      dispatch(postLogin.rejected({ errorMessage: error.message, account }))
      dispatch(saveAccount({ account: '' }))
      return LOGIN_STATUS.FAILED
    }
  }

  return checkLogin
}
