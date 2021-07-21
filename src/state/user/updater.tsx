import useInterval from 'hooks/useInterval'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuthState } from 'state/auth/hooks'
import { AppDispatch } from '../index'
import { updateMatchesDarkMode } from './actions'
import { useFetchUserSecTokenListCallback } from './hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const isWindowVisible = useIsWindowVisible()
  const { token } = useAuthState()
  const fetchList = useFetchUserSecTokenListCallback()
  const fetchListCallback = useCallback(() => {
    if (!isWindowVisible) return
    fetchList().catch((error) => console.debug('interval user sec token list fetching error', error))
  }, [fetchList, isWindowVisible])
  useInterval(fetchListCallback, token ? 1000 * 60 * 2 : null)
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
