import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { AuthorizerCategory } from 'types/app'

export const useAuthorizerPendingItems = (category: AuthorizerCategory) => {
  const getUri = () => {
    let uri
    switch (category) {
      case AuthorizerCategory.BankAccounts:
        uri = '/accounts/banks/list'
        break
      case AuthorizerCategory.CashWithdrawals:
        uri = '/accounts/cash/withdrawals'
        break

      case AuthorizerCategory.Commitments:
        uri = '/issuance/commitments/list'
        break

      case AuthorizerCategory.Corporates:
        uri = '/identity/corporates/list'
        break

      case AuthorizerCategory.DealClosure:
        uri = '/issuance/closure/list'
        break

      case AuthorizerCategory.DigitalSecurityWithdrawals:
        uri = '/accounts/security/withdrawals'
        break

      case AuthorizerCategory.Individuals:
        uri = '/identity/individuals/list'
        break

      case AuthorizerCategory.IssuanceDetails:
        uri = '/identity/issuance-detail/list'
        break

      case AuthorizerCategory.Listings:
        uri = '/exchange/listing/list'
        break
      case AuthorizerCategory.Offerings:
        uri = '/issuance/dso/list'
        break

      case AuthorizerCategory.VirtualAccounts:
        uri = '/virtual-accounts/list'
        break

      case AuthorizerCategory.WithdrawalAddresses:
        uri = '/accounts/withdrawal-addresses/list'
        break

      default:
        uri = ''
        break
    }
    return uri
  }
  const data = useTableWithPagination<any>(
    `pending-${category}`,
    getUri(),
    { status: 'Submitted' },
    true
  )
  return {
    total: data?.total,
    status: data?.status
  }
}
