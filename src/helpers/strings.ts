import { DigitalSecurityOffering } from 'types/dso'
import { Commitment } from 'types/commitment'
import { AssetBalance } from 'types/balance'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { Order } from 'types/order'

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

export const getOrderSideName = (value: Order['side']) => {
  return value === 'ASK' ? 'Sell' : 'Buy'
}

export const getPersonName = (data: IndividualIdentity | null | undefined) => {
  if (data === null || data === undefined) {
    return undefined
  }

  return `${data.firstName} ${data.middleName ?? ''} ${data.lastName}`
}

export const isLowerCaseLetter = (value: string) => {
  const charCode = value.charCodeAt(0)

  return charCode >= 97 && charCode <= 122
}

export const capitalizeFirstLetter = (value: string) =>
  `${value[0].toUpperCase()}${value.slice(1)}`

export const formatCamelCasedWithSpaces = (value: string) => {
  let str = value

  if (isLowerCaseLetter(value[0])) {
    str = capitalizeFirstLetter(value)
  }

  return str.replace(/([A-Z])/g, ' $1')
}

export const getTextWithOrWithoutColon = (text: string, hasColon: boolean) =>
  hasColon ? text.concat(':') : text
