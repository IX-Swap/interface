import { DigitalSecurityOffering } from 'v2/types/dso'
import { Commitment } from 'v2/types/commitment'
import { AssetBalance } from 'v2/types/balance'
import { DSWithdrawal } from 'v2/types/dsWithdrawal'
import { IndividualIdentity } from 'v2/types/identity'

interface GetIdFromObjProps extends Record<string, any> {
  _id?: string
}

export const getIdFromObj = (value?: GetIdFromObjProps | null): string =>
  value?._id ?? ''

export const isEmptyString = (value: string | null | undefined) =>
  value?.length === 0

export const compareStrings = (a: string, b: string) => a === b

export const getOfferingName = (
  data:
    | DigitalSecurityOffering
    | Commitment
    | AssetBalance
    | DSWithdrawal
    | undefined
    | null
) => {
  if (data === null || data === undefined) {
    return undefined
  }

  if ('tokenName' in data) {
    return `${data.tokenName} (${data.tokenSymbol})`
  }

  if ('dso' in data) {
    return `${data.dso.tokenName} (${data.dso.tokenSymbol})`
  }

  if ('symbol' in data) {
    return `${data.name} (${data.symbol})`
  }
}

export const getPersonName = (data: IndividualIdentity | null | undefined) => {
  if (data === null || data === undefined) {
    return undefined
  }

  return `${data.firstName} ${data.middleName ?? ''} ${data.lastName}`
}
