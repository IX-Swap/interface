import { useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
// import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useActiveWeb3React } from '../../hooks/web3'
import { useFetchSecTokenListCallback } from './hooks'

export default function Updater(): null {
  const { library } = useActiveWeb3React()
  // const isWindowVisible = useIsWindowVisible()

  const fetchList = useFetchSecTokenListCallback()
  const fetchListCallback = useCallback(() => {
    // if (!isWindowVisible) return
    fetchList().catch((error) => console.debug('interval sec token list fetching error', error))
  }, [fetchList])

  // fetch all lists every 15 minutes, but only after we initialize library
  useInterval(fetchListCallback, library ? 1000 * 60 * 15 : null)

  return null
}
