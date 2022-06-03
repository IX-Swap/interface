import axios from 'axios'
import { BigNumber, ethers } from 'ethers'
import { useErc20Contract } from 'hooks/blockchain/useContract'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useServices } from 'hooks/useServices'
import { useCallback } from 'react'

export interface SendTokenArgs {
  address?: string
  tokenChainId?: number
}
export const estimateMaxGas = async () => {
  try {
    const result = await axios.get(
      'https://gpoly.blockscan.com/gasapi.ashx?apikey=key&method=pendingpooltxgweidata'
    )
    return (result.data.result.rapidgaspricegwei * 2).toString()
  } catch (e) {
    return null
  }
}
export const getTransferProps = async () => {
  const props: ethers.Overrides = { gasLimit: BigNumber.from(9999999) }
  const estimatedGas = await estimateMaxGas()

  if (estimatedGas !== null && estimatedGas !== undefined) {
    props.gasPrice = ethers.utils.parseUnits(estimatedGas, 'gwei')
  }
  return props
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
        void snackbarService.showSnackbar(
          'Could not get details from metamask. Please refresh and try again',
          'error'
        )
        return false
      }
      try {
        const props = await getTransferProps()
        const result = await tokenContract.transfer(
          recipient,
          BigNumber.from(value),
          { ...props }
        )

        const receipt = await result.wait()
        if (receipt.status === 1) {
          return true
        }
        snackbarService.showSnackbar('Transaction failed', 'error')
        return false
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
