import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'

export const useMint = () => {
  const nft = useNftContract()
  const { account } = useActiveWeb3React()
  return useCallback(async () => {
    const res = await nft?.mint(
      account,
      'https://gateway.pinata.cloud/ipfs/QmbXjjSG7ovdNhTkHu6VYYQ9hRf787tYBdSW6syKwm18WU',
      {
        gasLimit: 900000,
      }
    )
    const params = await res.wait()
    console.log({ res, params })
  }, [nft, account])
}

export const useGetSupply = () => {
  const nft = useNftContract()
  return useCallback(async () => {
    try {
      const res = await nft?.totalSupply()
      const uri = await nft?.tokenURI(2)
      console.log({ res, uri })
    } catch (e) {
      console.error('cant get uri or supply')
    }
  }, [nft])
}
