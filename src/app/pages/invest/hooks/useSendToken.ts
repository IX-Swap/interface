import { BigNumber } from 'ethers'
import { useErc20Contract } from 'hooks/blockchain/useContract'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useCallback } from 'react'

export interface SendTokenArgs {
  address?: string
  tokenChainId?: number
}
export const useSendToken = ({ address, tokenChainId }: SendTokenArgs) => {
  const { account, chainId } = useActiveWeb3React()
  const tokenContract = useErc20Contract(address, true)
  return useCallback(
    async (recipient: string, value: number) => {
      if (
        tokenContract === null ||
        account === undefined ||
        account === null ||
        chainId !== tokenChainId
      ) {
        return false
      }
      try {
        const result = await tokenContract.transfer(
          recipient,
          BigNumber.from(value),
          { gasLimit: BigNumber.from(9999999) }
        )
        const final = await result.wait()
        return final
      } catch (e) {
        console.error({ e })
        return false
      }
    },
    [account, chainId, tokenChainId, tokenContract]
  )
}
