// import { useOTCPairDSO } from 'app/pages/invest/hooks/useOTCPairDSO'
import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'
import { useParams } from 'react-router-dom'

export const usePairTokenAddressNetwork = () => {
  // const dso = useOTCPairDSO()
  // const address = dso?.deploymentInfo?.token
  // const chainId = dso?.network?.chainId

  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useOTCMarket(pairId)

  const address = data?.otc?.dso?.deploymentInfo?.token
  const chainId = data?.otc?.dso?.network?.chainId
  return { address, chainId }
}
