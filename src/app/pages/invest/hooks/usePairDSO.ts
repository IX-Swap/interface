import { useMarket } from 'app/pages/invest/hooks/useMarket'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'

export const usePairDSO = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data: marketData } = useMarket(pairId)
  const dsoId = marketData?.listing.dso
  const issuer = marketData?.listing.asset.createdBy
  const { data: dso } = useDSOById(dsoId, issuer)
  return dso
}
