import axios from 'axios'
import { GAS } from 'config'
import { CHAIN_INFO } from 'config/blockchain/constants'
import { BigNumber, ethers } from 'ethers'
import { useErc20Contract } from 'hooks/blockchain/useContract'
import { useActiveWeb3React } from 'hooks/blockchain/web3'
import { useServices } from 'hooks/useServices'
import { useCallback } from 'react'

export interface SendTokenArgs {
  address?: string
  amount: number
  tokenChainId?: number
  recipient?: string
  callback: () => Promise<void>
}
export const estimateGas = async (chainId?: number) => {
  try {
    const result = await axios.get(CHAIN_INFO[chainId ?? 137].gasTrackerUrl)
    const innerResult = result?.data?.result

    const value =
      GAS === 'low'
        ? innerResult?.standardgaspricegwei ?? innerResult?.SafeGasPrice
        : innerResult?.rapidgaspricegwei ?? innerResult?.FastGasPrice
    return value.toString()
  } catch (e) {
    return null
  }
}
export const getTransferProps = async (chainId?: number) => {
  const props: ethers.Overrides = { gasLimit: BigNumber.from(9999999) }
  const estimatedGas = await estimateGas(chainId)

  if (estimatedGas !== null && estimatedGas !== undefined) {
    props.gasPrice = ethers.utils.parseUnits(estimatedGas, 'gwei')
  }
  return props
}
export const useSendToken = ({
  address,
  tokenChainId,
  amount,
  recipient,
  callback
}: SendTokenArgs) => {
  const { account, chainId } = useActiveWeb3React()
  const tokenContract = useErc20Contract(address, true)
  const { snackbarService } = useServices()

  return useCallback(async () => {
    if (
      tokenContract === null ||
      account === undefined ||
      account === null ||
      chainId !== tokenChainId ||
      recipient === undefined ||
      amount === 0
    ) {
      let message =
        'Could not get details from metamask. Please refresh and try again'
      if (amount === 0) {
        message = 'Invalid amount'
      }
      if (chainId !== tokenChainId) {
        message = 'Wrong chain'
      }
      void snackbarService.showSnackbar(message, 'error')
      return
    }
    try {
      const props = await getTransferProps(chainId)
      const result = await tokenContract.transfer(
        recipient,
        BigNumber.from(amount),
        { ...props }
      )
      await callback()

      await result.wait()
      void snackbarService.showSnackbar('Token transfer finished', 'info')
    } catch (error: any) {
      if (error?.message?.includes('404') === false) {
        void snackbarService.showSnackbar(error.message, 'error')
      }
    }
  }, [
    account,
    chainId,
    tokenChainId,
    tokenContract,
    snackbarService,
    recipient,
    amount,
    callback
  ])
}
