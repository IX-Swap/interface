import { CashDeposit } from 'types/cashDeposit'
import { formatMoney } from 'helpers/numbers'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { Commitment } from 'types/commitment'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { Asset } from 'types/asset'
import { DigitalSecurityOffering } from 'types/dso'
import { AssetBalance } from 'types/balance'
import { PersonName } from './types'
import { formatDateToMMDDYY } from 'helpers/dates'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import {
  CorporateIdentity,
  IndividualIdentity,
  Personnel
} from 'app/pages/identity/types/forms'
import { useUserById } from 'app/pages/admin/hooks/useUserById'
import { Closure } from 'app/pages/authorizer/pages/DealClosures/DealClosures'

export const renderMinimumInvestment = (
  amount: number,
  row: DigitalSecurityOffering
): string => formatMoney(amount, row.tokenSymbol)

export const renderClosureMinimumInvestment = (
  amount: number,
  row: Closure
): string => formatMoney(amount, row.dso?.tokenSymbol)

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

  return row.representatives
    .map(({ fullName }: Personnel) => fullName)
    .join(', ')
}

export const renderLastName = (
  val: string,
  row: CorporateIdentity | DSWithdrawal | IndividualIdentity | Commitment | any
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

export const getIndividualLastName = (
  individual: IndividualIdentity
): string => {
  if (individual !== undefined) {
    return individual.lastName
  }
  return ''
}

export const getCorporateLegalName = (corporate: CorporateIdentity): string => {
  if (corporate !== undefined) {
    return corporate.companyLegalName
  }
  return ''
}

export const getCorporateRepresentativeName = (corporate: any): string => {
  if (corporate !== undefined) {
    return corporate.representatives?.[0]?.lastName ?? ''
  }
  return ''
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
    | WithdrawalAddress
): string => {
  let lastName = ''
  let companyName = ''

  if ('lastName' in row) {
    lastName = getIndividualLastName(row)
  } else if ('representatives' in row) {
    lastName = getCorporateRepresentativeName(row)
    companyName = getCorporateLegalName(row)
  } else if ('individual' in row || 'corporates' in row) {
    lastName = getIndividualLastName(row.individual)
    companyName = getCorporateLegalName(row.corporates[0])
  } else if (row.identity !== undefined && 'identity' in row) {
    lastName = getIndividualLastName(row.identity.individual)
    companyName = getCorporateLegalName(row.identity.corporates[0])
  }

  if (val === undefined || lastName === '') {
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
    symbol = row.asset?.symbol
  }

  return formatMoney(amount, symbol)
}

export const renderClosureAmount = (val: string, row: Closure): string => {
  const amount = Number.isNaN(val) ? 0 : parseFloat(val)
  const symbol = row.dso?.currency.symbol
  return formatMoney(amount, symbol)
}

export const renderLatestDate = (val: string, row: any): string => {
  const latest = row.lastTransaction ?? row.updatedAt ?? row.createdAt ?? val

  return typeof latest === 'string' ? formatDateToMMDDYY(latest) : ''
}

export const getUserNameById = (userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useUserById(userId)

  if (isLoading) {
    return ''
  }

  return data?.name
}
