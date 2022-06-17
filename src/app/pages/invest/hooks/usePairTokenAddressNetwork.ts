import { usePairDSO } from 'app/pages/invest/hooks/usePairDSO'

export const usePairTokenAddressNetwork = () => {
  const dso = usePairDSO()
  const address = dso?.deploymentInfo?.token
  const chainId = dso?.network?.chainId
  return { address, chainId }
}
