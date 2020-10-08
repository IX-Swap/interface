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

export const AccountsRoute = {
  landing: '/app/accounts',
  banks: '/app/accounts/banks',
  balances: '/app/accounts/balances',
  digitalSecurities: '/app/accounts/digital-securities',
  transactions: '/app/accounts/transactions',
  depositCash: '/app/accounts/deposit-cash',
  withdrawCash: '/app/accounts/withdraw-cash'
}

export const accountRoutes: InternalRouteProps[] = [
  {
    label: 'Account',
    path: AccountsRoute.landing,
    exact: true,
    root: true
  },
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
    label: 'Cash Deposit',
    component: DepositCash
  },
  {
    color: '#e6d200',
    icon: CashWithdrawalIcon,
    path: AccountsRoute.withdrawCash,
    label: 'Cash Withdrawal',
    component: WithdrawCash
  },
  {
    label: 'Asset Balance',
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
  }
]

export const useAccountsRouter = generateAppRouterHook(
  AccountsRoute,
  AccountsRoute.landing,
  accountRoutes
)
