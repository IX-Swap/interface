import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'

export const usePairTokenAddressNetwork = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data: marketData } = useMarket(pairId)
  const dsoId = marketData?.listing.dso
  const issuer = marketData?.listing.asset.createdBy
  const { data: dso } = useDSOById(dsoId, issuer)
  const address = dso?.deploymentInfo?.token
  const chainId = dso?.network?.chainId
  return { address, chainId }
}
