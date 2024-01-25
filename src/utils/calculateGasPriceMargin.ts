import { BigNumber } from '@ethersproject/bignumber'
import { ethers } from 'ethers'

const POLYGON_CHAIN_ID = 137
const POLYGON_MUMBAI_CHAIN_ID = 80001

export function calculateGasPriceMargin(chainId: number | undefined, gasPrice: any): BigNumber {
  // add 20% for polygon
  if (chainId === POLYGON_CHAIN_ID || chainId === POLYGON_MUMBAI_CHAIN_ID) {
    const margin = ethers.BigNumber.from((gasPrice || '0').toString())
      .mul(BigNumber.from(10000 + 2000))
      .div(BigNumber.from(10000))
    return margin
  }

  return gasPrice
}
