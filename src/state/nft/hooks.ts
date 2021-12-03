import { useNftContract } from 'hooks/useContract'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from 'state'
import { saveImageIds } from './actions'

export function useNFTState(): AppState['nft'] {
  return useSelector<AppState, AppState['nft']>((state) => state.nft)
}
export const useGetUserTokens = () => {
  // make api call to my-tokens
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(() => {
    dispatch(saveImageIds({ ids: [2, 3] }))
    return [2, 3]
  }, [dispatch])
}

export const useGetTokensMetadata = () => {
  const nft = useNftContract()
  const { imageIds } = useNFTState()
  return useCallback(async () => {
    const promises = Object.keys(imageIds).map(async (id: string) => {
      const uri = await nft?.tokenURI(Number(id))
      return uri
    })
    const uris = await Promise.all(promises)
    console.log(uris)
  }, [imageIds, nft])
}

export const useGetNftData = () => {
  const getUserTokens = useGetUserTokens()
  const { imageIds } = useNFTState()
  const getMetadata = useGetTokensMetadata()
  useEffect(() => {
    getUserTokens()
  }, [getUserTokens])

  useEffect(() => {
    if (Object.keys(imageIds).length) {
      getMetadata()
    }
  }, [imageIds, getMetadata])
}
