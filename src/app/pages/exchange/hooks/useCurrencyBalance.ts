import { useVirtualAccount } from 'app/pages/accounts/hooks/useVirtualAccount'

export const useCurrencyBalance = (currencyName?: string) => {
  const { list } = useVirtualAccount()
  const virtualAccount =
    list !== undefined
      ? list.find(
          (item: { currency: string }) => item.currency === currencyName
        )
      : undefined
  const currencyBalance =
    virtualAccount !== undefined ? virtualAccount.balance.outstanding : 0
  return currencyBalance
}
