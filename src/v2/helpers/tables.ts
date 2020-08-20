import { CashDeposit } from 'v2/types/cashdeposit'
import { formatMoney } from 'v2/helpers/numbers'
import { CashWithdrawal } from 'v2/types/cash-withdrawal'
import { Commitment } from 'v2/types/commitment'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import { DSWithdrawal } from 'v2/types/ds-withdrawal'
import { Asset } from 'v2/types/asset'
import { Dso } from 'v2/types/dso'

export const renderMinimumInvestment = (amount: number, row: Dso): string =>
  formatMoney(amount, row.tokenSymbol)

export const renderIncome = (i: string): string => `SGD ${i}`

export const renderAssetName = (a: Asset): string => a.name

export const renderFirstName = (
  val: string,
  row: CashDeposit | CashWithdrawal | Commitment
): string => `${val} ${row.individual.lastName}`

export const renderLastName = (
  val: string,
  row: CorporateIdentity | DSWithdrawal | IndividualIdentity
): string => {
  let lastName: string

  if ('lastName' in row) {
    lastName = row.lastName
  } else if ('individual' in row) {
    lastName = row.individual.lastName
  } else {
    lastName = row.representatives[0].lastName
  }

  return `${val} ${lastName}`
}

export const renderAmount = (
  val: string,
  row: CashDeposit | CashWithdrawal | Commitment | DSWithdrawal | Dso
): string => {
  const amount = Number.isNaN(val) ? 0 : parseFloat(val)
  let symbol

  if ('currency' in row) {
    if (Array.isArray(row.currency)) {
      symbol = row.currency[0]?.numberFormat?.currency ?? ''
    } else {
      symbol = row.currency.numberFormat.currency
    }
  } else {
    symbol = row.asset.symbol
  }

  return formatMoney(amount, symbol)
}
