import { useTableWithPagination } from 'components/TableWithPagination/hooks/useTableWithPagination'
import { AuthorizerCategory } from 'types/app'

const categoryMap = {
  [AuthorizerCategory.BankAccounts]: '/accounts/banks/list',
  [AuthorizerCategory.CashWithdrawals]: '/accounts/cash/withdrawals',
  [AuthorizerCategory.Commitments]: '/issuance/commitments/list',
  [AuthorizerCategory.Corporates]: '/identity/corporates/list',
  [AuthorizerCategory.CorporatesAccreditation]:
    '/identity/accreditation/corporate/list',
  [AuthorizerCategory.DealClosure]: '/issuance/closure/list',
  [AuthorizerCategory.SecurityTokenWithdrawals]:
    '/accounts/security/withdrawals',
  [AuthorizerCategory.Individuals]: '/identity/individuals/list',
  [AuthorizerCategory.IndividualsAccreditation]:
    '/identity/accreditation/individual/list',
  [AuthorizerCategory.IssuanceDetails]: '/identity/issuance-detail/list',
  [AuthorizerCategory.Listings]: '/exchange/listing/list',
  [AuthorizerCategory.Offerings]: '/issuance/dso/list',
  [AuthorizerCategory.VirtualAccounts]: '/virtual-accounts/list',
  [AuthorizerCategory.WithdrawalAddresses]:
    '/accounts/withdrawal-addresses/list',
  [AuthorizerCategory.TokenDeployment]: '/issuance/dso/list'
}

export const useAuthorizerPendingItems = (category: AuthorizerCategory) => {
  const isCommitment = category === AuthorizerCategory.Commitments
  const data = useTableWithPagination<any>({
    queryKey: `pending-${category}`,
    uri: categoryMap[category],
    defaultFilter: {
      status: !isCommitment ? 'Submitted' : undefined,
      fundStatus: !isCommitment ? undefined : 'Funds on hold'
    },
    queryEnabled: true
  })
  return {
    total: data?.total,
    status: data?.status
  }
}
