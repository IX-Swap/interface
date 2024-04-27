import { BigNumber, utils } from 'ethers'

export const getPrice = (
  shareReserve: number,
  currentShareWeight: number,
  assetReserve: number,
  currentAssetWeight: number
) => {
  return (assetReserve * currentShareWeight) / (shareReserve * currentAssetWeight)
}

// getDecayAtStep return a negative number
export const getDecayAtStep = (shareStartWeight: number, shareEndWeight: number, step: number, totalStep: number) => {
  return ((shareEndWeight - shareStartWeight) * step) / totalStep
}

function expandTo18Decimals(amount: BigNumber, currentDecimals: number): BigNumber {
  if (currentDecimals < 18) {
    return BigNumber.from(amount).mul(BigNumber.from(10).pow(18 - currentDecimals))
  } else {
    return amount
  }
}

type GetPriceArgs = {
  currentAssetReserve: BigNumber
  currentShareReserve: BigNumber
  currentAssetWeight: BigNumber
  currentShareWeight: BigNumber
  assetDecimals: number
  shareDecimals: number
}

export const getPriceFromRawReservesAndWeights = (args: GetPriceArgs) => {
  const numerator = expandTo18Decimals(args.currentAssetReserve, args.assetDecimals)
    .mul(utils.parseEther('1'))
    .div(args.currentAssetWeight)
  const denominator = expandTo18Decimals(args.currentShareReserve, args.shareDecimals)
    .mul(utils.parseEther('1'))
    .div(args.currentShareWeight)

  const price = utils.formatEther(numerator.mul(utils.parseEther('1')).div(denominator).toString())
  return price
}
