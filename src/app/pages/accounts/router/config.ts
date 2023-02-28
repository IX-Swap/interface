import { ReactComponent as HoldingsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as AssetBalanceIcon } from 'assets/icons/navigation/asset-balance.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as TransactionIcon } from 'assets/icons/navigation/transaction.svg'
import { ReactComponent as WithdrawalAddressIcon } from 'assets/icons/navigation/withdrawal-address.svg'
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
  reports: '/app/accounts/reports',
  myHoldings: '/app/accounts/holdings',
  cash: '/app/accounts/cash'
}

export const accountsLandingLinks: InternalRouteProps[] = [
  {
    label: 'Cash',
    path: AccountsRoute.cash,
    color: '#90a30f',
    icon: AssetBalanceIcon
  },
  {
    label: 'Commitments',
    path: AccountsRoute.commitments,
    color: '#e6d200',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Security Tokens',
    path: AccountsRoute.digitalSecurities,
    color: '#8b3dff',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Transactions',
    path: AccountsRoute.transactions,
    color: '#90a30f',
    icon: TransactionIcon
  },
  {
    label: 'Blockchain Addresses',
    path: AccountsRoute.withdrawalAddresses,
    color: '#e6d200',
    icon: WithdrawalAddressIcon
  },
  {
    label: 'Dashboard',
    path: AccountsRoute.dashboard,
    color: '#e6d200',
    icon: WithdrawalAddressIcon
  },
  {
    label: 'My Reports',
    path: AccountsRoute.reports,
    color: '#e6d200'
  },
  {
    label: 'My Exchange Holdings',
    path: AccountsRoute.myHoldings,
    color: '#2B78FD',
    icon: HoldingsIcon
  }
]
