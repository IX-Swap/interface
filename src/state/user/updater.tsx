import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'state/auth/hooks'
import { AppDispatch } from '../index'
import { updateMatchesDarkMode } from './actions'
import { useFetchUserSecTokenListCallback, useUserAccountState } from './hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const isWindowVisible = useIsWindowVisible()
  const fetchList = useFetchUserSecTokenListCallback()
  const { account } = useActiveWeb3React()
  const savedAccount = useUserAccountState()

  const fetchListCallback = useCallback(async () => {
    if (!isWindowVisible || !savedAccount) {
      return
    }
    try {
      await fetchList(false) // Ensure fetchList doesn't cause state reset
    } catch (error) {
      console.log('Failed to fetch list:', error)
    }
  }, [fetchList, isWindowVisible, savedAccount])

  useInterval(fetchListCallback, account ? 1000 * 60 * 1 : null)

  // Keep dark mode in sync with the system
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
