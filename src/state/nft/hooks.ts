import axios from 'axios'
import { useNftContract } from 'hooks/useContract'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { wait } from 'utils/retry'
import { saveImages } from './actions'

export function useNFTState(): AppState['nft'] {
  return useSelector<AppState, AppState['nft']>((state) => state.nft)
}
export const useGetUserTokens = () => {
  // make api call to my-tokens
  const dispatch = useDispatch<AppDispatch>()
  const nft = useNftContract()

  return useCallback(async () => {
    const tokenIds = [2, 3]
    //
    console.log('gettting metadata')
    const promises = tokenIds.map(async (id: number) => {
      const uri = await nft?.tokenURI(Number(id))
      return uri
    })
    const uris = await Promise.all(promises)
    const metadataPromises = uris.map(async (uri: string) => {
      console.log({ uri })
      const json = await axios.get(uri)
      await wait(4000)
      return json.data
    })
    const jsons = await Promise.all(metadataPromises)
    dispatch(saveImages({ images: jsons, ids: tokenIds }))
    console.log({ jsons })
  }, [nft, dispatch])
}

export const useGetNftData = () => {
  const getUserTokens = useGetUserTokens()
  useEffect(() => {
    getUserTokens()
  }, [getUserTokens])
}
