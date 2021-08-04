import { SECURITY_TOKENS } from 'config'
import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LOGIN_STATUS, useLogin } from 'state/auth/hooks'
import { AppDispatch } from '../index'
import { updateMatchesDarkMode } from './actions'
import { useFetchUserSecTokenListCallback } from './hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const isWindowVisible = useIsWindowVisible()
  const login = useLogin({ expireLogin: false, mustHavePreviousLogin: true, caller: 'updater' })
  const fetchList = useFetchUserSecTokenListCallback()
  const { account } = useActiveWeb3React()
  const fetchListCallback = useCallback(async () => {
    if (!isWindowVisible) return
    if (!SECURITY_TOKENS) return
    const loginStatus = await login()
    if (loginStatus !== LOGIN_STATUS.SUCCESS) {
      return
    }
    fetchList().catch((error) => console.debug('interval user sec token list fetching error', error))
  }, [fetchList, isWindowVisible, login])
  useInterval(fetchListCallback, account ? 1000 * 60 * 4 : null)
  // keep dark mode in sync with the system
  useEffect(() => {
    const darkHandler = (match: MediaQueryListEvent) => {
      dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')
    dispatch(updateMatchesDarkMode({ matchesDarkMode: match.matches }))

    if (match?.addListener) {
      match?.addListener(darkHandler)
    } else if (match?.addEventListener) {
      match?.addEventListener('change', darkHandler)
    }

    return () => {
      if (match?.removeListener) {
        match?.removeListener(darkHandler)
      } else if (match?.removeEventListener) {
        match?.removeEventListener('change', darkHandler)
      }
    }
  }, [dispatch])

  return null
}
