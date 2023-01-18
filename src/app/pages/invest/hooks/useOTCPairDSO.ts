import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { useParams } from 'react-router-dom'

export const useOTCPairDSO = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data: marketData } = useOTCMarket(pairId)
  const dsoId = marketData?.otc.dso
  const issuer = marketData?.otc.createdBy
  const { data: dso } = useDSOById(dsoId, issuer)
  return dso
}
