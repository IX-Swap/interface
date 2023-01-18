import { useOTCPairDSO } from 'app/pages/invest/hooks/useOTCPairDSO'

export const usePairTokenAddressNetwork = () => {
  const dso = useOTCPairDSO()
  const address = dso?.deploymentInfo?.token
  const chainId = dso?.network?.chainId
  return { address, chainId }
}
