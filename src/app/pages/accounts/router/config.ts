import { InternalRouteProps } from 'types/util'
import {
  ReactComponent as HoldingsIcon,
  ReactComponent as AccountIcon
} from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashDepositIcon } from 'assets/icons/navigation/cash-deposit.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as AssetBalanceIcon } from 'assets/icons/navigation/asset-balance.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as WithdrawalAddressIcon } from 'assets/icons/navigation/withdrawal-address.svg'
import { ReactComponent as TransactionIcon } from 'assets/icons/navigation/transaction.svg'
import { makeURL } from 'config/appURL'

export const AccountsRoute = {
  landing: makeURL(['app', 'account']),
  banks: makeURL(['app', 'account', 'bankAccount']),
  balances: makeURL(['app', 'account', 'balances']),
  digitalSecurities: makeURL(['app', 'account', 'digitalSecurity']),
  transactions: makeURL(['app', 'account', 'transactions']),
  depositCash: makeURL(['app', 'account', 'cashDeposit']),
  deposit: makeURL(['app', 'account', 'deposit']),
  withdraw: makeURL(['app', 'account', 'withdraw']),
  withdrawCash: makeURL(['app', 'account', 'cashWithdrawal']),
  withdrawalAddresses: makeURL(['app', 'account', 'withdrawalAddresses']),
  withdrawalAddressesCreate: makeURL([
    'app',
    'account',
    'withdrawalAddresses',
    'create'
  ]),
  commitments: makeURL(['app', 'account', 'commitments']),
  dashboard: makeURL(['app', 'account', 'dashboard']),
  reports: '/app/accounts/reports',
  myHoldings: '/app/accounts/holdings'
}

export const accountsLandingLinks: InternalRouteProps[] = [
  {
    label: 'Bank Accounts',
    path: AccountsRoute.banks,
    color: '#2b78fd',
    icon: AccountIcon
  },
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
  }
]
