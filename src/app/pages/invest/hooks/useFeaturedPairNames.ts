import { useFeaturedPair } from 'app/pages/invest/hooks/useFeaturedPair'

export const getPairNames = (pair: string) => {
  const currencyName = pair.split('/')[1]
  const tokenName = pair.split('/')[0]
  return { currencyName, tokenName }
}

export const useFeaturedPairNames = () => {
  const { data: pair } = useFeaturedPair()
  const symbol = pair?.name ?? ''
  const { currencyName, tokenName } = getPairNames(symbol)
  return { currencyName, tokenName }
}
