import { useOTCMarket } from 'app/pages/invest/hooks/useOTCMarket'
import { useParams } from 'react-router-dom'

export const getPairNames = (pair: string) => {
  const currencyName = pair.split('/')[1]
  const tokenName = pair.split('/')[0]
  return { currencyName, tokenName }
}

export const useSelectedPairNames = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()

  const { data } = useOTCMarket(pairId)

  const symbol = data?.name ?? ''
  const { currencyName, tokenName } = getPairNames(symbol)
  return { currencyName, tokenName }
}
