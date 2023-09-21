import { ReactComponent as HoldingsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as AssetBalanceIcon } from 'assets/icons/navigation/asset-balance.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as SecurityTokensIcon } from 'assets/icons/navigation/security-tokens.svg'
import { ReactComponent as TransactionIcon } from 'assets/icons/navigation/va-transactions.svg'
import { ReactComponent as WithdrawalAddressIcon } from 'assets/icons/navigation/withdrawal-address.svg'
import { ReactComponent as ListingsIcon } from 'assets/icons/navigation/listings.svg'
// import { ReactComponent as ReportsIcon } from 'assets/icons/navigation/mas-disclosure.svg'
import { makeURL } from 'config/appURL'
import { InternalRouteProps } from 'types/util'

export const AccountsRoute = {
  landing: makeURL(['app', 'accounts']),
  banks: '/app/accounts/cash/bank-accounts',
  balances: makeURL(['app', 'accounts', 'balances']),
  digitalSecurities: makeURL(['app', 'accounts', 'digitalSecurity']),
  transactions: makeURL(['app', 'accounts', 'transactions']),
  deposit: '/app/accounts/cash/deposit',
  withdraw: '/app/accounts/cash/withdraw',
  withdrawalAddresses: makeURL(['app', 'accounts', 'withdrawalAddresses']),
  withdrawalAddressesCreate: makeURL([
    'app',
    'accounts',
    'withdrawalAddresses',
    'create'
  ]),
  commitments: makeURL(['app', 'accounts', 'commitments']),
  dashboard: makeURL(['app', 'accounts', 'dashboard']),
  //   reports: '/app/accounts/reports',
  myHoldings: '/app/accounts/holdings',
  myInvestments: '/app/accounts/investments',
  cash: '/app/accounts/cash'
}

export const accountsLandingLinks: InternalRouteProps[] = [
  {
    label: 'Cash',
    path: AccountsRoute.cash,
    icon: AssetBalanceIcon
  },
  {
    label: 'Commitments',
    path: AccountsRoute.commitments,
    icon: DSWithdrawalIcon
  },
  {
    label: 'My Tokens',
    path: AccountsRoute.digitalSecurities,
    icon: SecurityTokensIcon
  },
  {
    label: 'Transactions',
    path: AccountsRoute.transactions,
    icon: TransactionIcon
  },
  {
    label: 'Wallet Addresses',
    path: AccountsRoute.withdrawalAddresses,
    icon: WithdrawalAddressIcon
  },
  //   {
  //     label: 'Dashboard',
  //     path: AccountsRoute.dashboard,
  //     icon: WithdrawalAddressIcon
  //   },
  //     label: 'My Reports',
  //     path: AccountsRoute.reports,
  //   },
  {
    label: 'My Exchange Holdings',
    path: AccountsRoute.myHoldings,
    icon: HoldingsIcon
  },
  {
    label: 'My Investments',
    path: AccountsRoute.myInvestments,
    icon: ListingsIcon
  }
]
