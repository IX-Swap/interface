import { BigNumber } from 'ethers'
import { useErc20Contract } from 'hooks/blockchain/useContract'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useServices } from 'hooks/useServices'
import { useCallback } from 'react'

export interface SendTokenArgs {
  address?: string
  tokenChainId?: number
}
export const useSendToken = ({ address, tokenChainId }: SendTokenArgs) => {
  const { account, chainId } = useActiveWeb3React()
  const tokenContract = useErc20Contract(address, true)
  const { snackbarService } = useServices()

  return useCallback(
    async (value: number, recipient?: string) => {
      if (
        tokenContract === null ||
        account === undefined ||
        account === null ||
        chainId !== tokenChainId ||
        recipient === undefined
      ) {
        return false
      }
      try {
        const result = await tokenContract.transfer(
          recipient,
          BigNumber.from(value),
          { gasLimit: BigNumber.from(9999999) }
        )

        await result.wait()
        return true
      } catch (error: any) {
        if (error?.message?.includes('404') === false) {
          void snackbarService.showSnackbar(error.message, 'error')
          return false
        }
        return true
      }
    },
    [account, chainId, tokenChainId, tokenContract, snackbarService]
  )
}
