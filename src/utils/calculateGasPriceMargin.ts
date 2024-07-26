import { BigNumber } from '@ethersproject/bignumber'
import { ENV_SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { ethers } from 'ethers'

export function calculateGasPriceMargin(chainId: number | undefined, gasPrice: any): BigNumber {
  // add 20% for polygon
  if (ENV_SUPPORTED_TGE_CHAINS?.includes(chainId || 0)) {
    const margin = ethers.BigNumber.from((gasPrice || '0').toString())
      .mul(BigNumber.from(10000 + 2000))
      .div(BigNumber.from(10000))
    return margin
  }

  return gasPrice
}
