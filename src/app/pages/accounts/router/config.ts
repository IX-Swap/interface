import { ReactComponent as HoldingsIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as AssetBalanceIcon } from 'assets/icons/navigation/asset-balance.svg'
import { ReactComponent as CashDepositIcon } from 'assets/icons/navigation/cash-deposit.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
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
  depositCash: makeURL(['app', 'accounts', 'cashDeposit']),
  deposit: '/app/accounts/cash/deposit',
  withdraw: '/app/accounts/cash/withdraw',
  withdrawCash: makeURL(['app', 'accounts', 'cashWithdrawal']),
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
    color: '#43b526',
    icon: CashDepositIcon,
    path: AccountsRoute.depositCash,
    label: 'Cash Deposits'
  },
  {
    label: 'Commitments',
    path: AccountsRoute.commitments,
    color: '#e6d200',
    icon: DSWithdrawalIcon
  },
  {
    color: '#e6d200',
    icon: CashWithdrawalIcon,
    path: AccountsRoute.withdrawCash,
    label: 'Cash Withdrawals'
  },
  {
    label: 'Asset Balances',
    path: AccountsRoute.balances,
    color: '#e65133',
    icon: AssetBalanceIcon
  },
  {
    label: 'Digital Securities',
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
  },
  {
    label: 'Cash',
    path: AccountsRoute.cash,
    color: '#90a30f',
    icon: AssetBalanceIcon
  }
]
