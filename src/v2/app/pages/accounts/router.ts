import { InternalRouteProps } from 'v2/types/util'
import { Balances } from 'v2/app/pages/accounts/pages/balances/Balances'
import { Banks } from 'v2/app/pages/accounts/pages/banks/Banks'
import { DigitalSecurities } from 'v2/app/pages/accounts/pages/digitalSecurities/DigitalSecurities'
import { Transactions } from 'v2/app/pages/accounts/pages/transactions/Transactions'
import { generateAppRouterHook } from 'v2/helpers/generateAppRouterHook'
import { ReactComponent as AccountIcon } from 'assets/icons/navigation/account.svg'
import { ReactComponent as CashDepositIcon } from 'assets/icons/navigation/cash-deposit.svg'
import { ReactComponent as CashWithdrawalIcon } from 'assets/icons/navigation/cash-withdrawal.svg'
import { ReactComponent as AssetBalanceIcon } from 'assets/icons/navigation/asset-balance.svg'
import { ReactComponent as DSWithdrawalIcon } from 'assets/icons/navigation/ds-withdrawal.svg'
import { ReactComponent as TransactionIcon } from 'assets/icons/navigation/transaction.svg'
import { DepositCash } from './pages/banks/DepositCash/DepositCash'
import { WithdrawCash } from './pages/banks/WithdrawCash/WithdrawCash'
import { makeURL } from 'v2/config/appURL'

export const AccountsRoute = {
  landing: makeURL(['app', 'account']),
  banks: makeURL(['app', 'account', 'bankAccount']),
  balances: makeURL(['app', 'account', 'balances']),
  digitalSecurities: makeURL(['app', 'account', 'digitalSecurity']),
  transactions: makeURL(['app', 'account', 'transactions']),
  depositCash: makeURL(['app', 'account', 'cashDeposit']),
  withdrawCash: makeURL(['app', 'account', 'cashWithdrawal'])
}

export const accountRoutes: InternalRouteProps[] = [
  {
    label: 'Bank Accounts',
    path: AccountsRoute.banks,
    component: Banks,
    color: '#2b78fd',
    icon: AccountIcon
  },
  {
    color: '#43b526',
    icon: CashDepositIcon,
    path: AccountsRoute.depositCash,
    label: 'Cash Deposits',
    component: DepositCash
  },
  {
    color: '#e6d200',
    icon: CashWithdrawalIcon,
    path: AccountsRoute.withdrawCash,
    label: 'Cash Withdrawals',
    component: WithdrawCash
  },
  {
    label: 'Asset Balances',
    path: AccountsRoute.balances,
    exact: true,
    component: Balances,
    color: '#e65133',
    icon: AssetBalanceIcon
  },
  {
    label: 'Digital Securities',
    path: AccountsRoute.digitalSecurities,
    component: DigitalSecurities,
    color: '#8b3dff',
    icon: DSWithdrawalIcon
  },
  {
    label: 'Transactions',
    path: AccountsRoute.transactions,
    component: Transactions,
    color: '#90a30f',
    icon: TransactionIcon
  },
  {
    label: 'Account',
    path: AccountsRoute.landing,
    exact: true,
    root: true
  }
]

export const useAccountsRouter = generateAppRouterHook(
  AccountsRoute,
  AccountsRoute.landing,
  accountRoutes
)
