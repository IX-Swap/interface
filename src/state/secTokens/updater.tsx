import { useCallback } from 'react'
import useInterval from '../../hooks/useInterval'
// import useIsWindowVisible from '../../hooks/useIsWindowVisible'
import { useWeb3React } from '@web3-react/core'
import { useFetchSecTokenListCallback } from './hooks'

export default function Updater(): null {
  const { provider } = useWeb3React()
  // const isWindowVisible = useIsWindowVisible()

  const fetchList = useFetchSecTokenListCallback()
  const fetchListCallback = useCallback(() => {
    // if (!isWindowVisible) return
    fetchList()
  }, [fetchList])

  // fetch all lists every 15 minutes, but only after we initialize library, otherwise after 20 minutes
  useInterval(fetchListCallback, provider ? 1000 * 60 * 15 : 1000 * 60 * 20)

  return null
}
