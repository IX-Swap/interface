import { IXS_ADDRESS } from 'constants/addresses'
import { useCurrency } from './Tokens'
import { useActiveWeb3React } from './web3'

const useIXSCurrency = () => {
  const { chainId } = useActiveWeb3React()
  const currency = useCurrency(IXS_ADDRESS[chainId ?? 1])
  return currency
}

export default useIXSCurrency
