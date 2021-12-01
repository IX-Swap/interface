import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'

export const useMint = () => {
  const nft = useNftContract()
  const { account } = useActiveWeb3React()
  return useCallback(async () => {
    const res = await nft?.mint(account, {
      gasLimit: 900000,
    })

    const params = await res.wait()
    console.log({ res, params })
  }, [nft, account])
}

export const useGetSupply = () => {
  const nft = useNftContract()
  return useCallback(async () => {
    const res = await nft?.totalSupply()
    console.log({ res })
  }, [nft])
}
