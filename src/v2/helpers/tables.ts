import { CashDeposit } from 'v2/types/cashDeposit'
import { formatMoney } from 'v2/helpers/numbers'
import { CashWithdrawal } from 'v2/types/cashWithdrawal'
import { Commitment } from 'v2/types/commitment'
import { CorporateIdentity, IndividualIdentity } from 'v2/types/identity'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { Asset } from 'v2/types/asset'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { AssetBalance } from 'v2/types/balance'
import { PersonName } from './types'
import { formatDateToMMDDYY } from 'v2/helpers/dates'

export const renderMinimumInvestment = (
  amount: number,
  row: DigitalSecurityOffering
): string => formatMoney(amount, row.tokenSymbol)

export const renderIncome = (i: string): string => `SGD ${i}`

export const renderAssetName = (a: Asset): string => a.name

export const renderAssetBalance = (val: string, row: AssetBalance): string =>
  `${row.name} (${val})`

export const renderFirstName = (
  val: string,
  row: CashDeposit | CashWithdrawal | Commitment
): string => {
  return ''
  // return `${val} ${row.individual.lastName}`
}

export const renderName = (val: string, row: PersonName) => {
  const names = [row.firstName, row.middleName, row.lastName]
  return names.filter(s => s !== undefined).join(' ')
}

export const renderRepresentativeName = (
  val: string,
  row: CorporateIdentity
) => {
  if (row.representatives.length === 0) {
    return ''
  }

  return row.representatives.map(r => renderName(val, r)).join(', ')
}

export const renderLastName = (
  val: string,
  row: CorporateIdentity | DSWithdrawal | IndividualIdentity | Commitment
): string => {
  let lastName: string

  if ('lastName' in row) {
    lastName = row.lastName
  } else if ('identity' in row) {
    lastName = row.identity.individual.lastName
  } else {
    const representative = row.representatives?.[0]
    lastName = representative?.lastName ?? ''
  }

  return `${val} ${lastName}`
}

const getLastAndCompanyName = ({
  individual,
  corporates
}: {
  individual: IndividualIdentity
  corporates: CorporateIdentity[]
}) => {
  let lastName: string = ''
  let companyName: string = ''
  if (individual !== undefined) {
    lastName = individual.lastName
  } else if (corporates.length > 0) {
    companyName = corporates[0].companyLegalName
  }
  return {
    lastName: lastName,
    companyName: companyName
  }
}

export const renderIndividualOrCompanyName = (
  val: string | undefined,
  row:
    | CorporateIdentity
    | DSWithdrawal
    | IndividualIdentity
    | Commitment
    | CashDeposit
    | CashWithdrawal
): string => {
  let lastName: string = ''
  let companyName: string = ''

  if ('lastName' in row) {
    lastName = row.lastName
  } else if ('representatives' in row) {
    const representative = row.representatives[0]
    lastName = representative?.lastName ?? ''
  } else if ('individual' in row || 'corporates' in row) {
    ;({ lastName, companyName } = getLastAndCompanyName(row))
  } else if ('identity' in row) {
    ;({ lastName, companyName } = getLastAndCompanyName(row.identity))
  }

  if (val === undefined) {
    return companyName
  }
  return `${val} ${lastName}`
}

export const renderAmount = (
  val: string,
  row:
    | CashDeposit
    | CashWithdrawal
    | Commitment
    | DSWithdrawal
    | DigitalSecurityOffering
    | AssetBalance
): string => {
  const amount = Number.isNaN(val) ? 0 : parseFloat(val)
  let symbol

  if ('currency' in row) {
    if (Array.isArray(row.currency)) {
      symbol = row.currency[0]?.numberFormat?.currency ?? ''
    } else if (typeof row.currency === 'string') {
      symbol = row.currency
    } else {
      symbol = row.currency.numberFormat.currency
    }
  } else if ('onHold' in row) {
    symbol = ''
  } else {
    symbol = row.asset.symbol
  }

  return formatMoney(amount, symbol)
}

export const renderLatestDate = (val: string, row: any): string => {
  const latest = row.lastTransaction ?? row.updatedAt ?? row.createdAt ?? val

  return typeof latest === 'string' ? formatDateToMMDDYY(latest) : ''
}
