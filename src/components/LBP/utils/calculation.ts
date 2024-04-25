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
