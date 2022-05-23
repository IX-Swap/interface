import { IndividualIdentity } from 'app/pages/identity/types/forms'
import { capitalize } from 'lodash'
import { AssetBalance } from 'types/balance'
import { Commitment } from 'types/commitment'
import { DigitalSecurityOffering } from 'types/dso'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { OrderSide } from 'types/order'
interface GetIdFromObjProps extends Record<string, any> {
  _id?: string
}

export const getIdFromObj = (value?: GetIdFromObjProps | null): string =>
  value?._id ?? ''

export const isEmptyString = (value: string | null | undefined) => {
  return value === undefined || value === null || value.trim().length === 0
}

export const isTruthy = (value: any) => {
  if (value === undefined || value === null) {
    return false
  }
  return !(value === '' || value === 0)
}

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

export const getOrderSideName = (value: OrderSide) => {
  return value === OrderSide.ASK ? 'Sell' : 'Buy'
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

export const capitalizeFirstLetter = (value: string) => capitalize(value)

export const formatCamelCasedWithSpaces = (value: string) => {
  let str = value

  if (isLowerCaseLetter(value[0])) {
    str = capitalizeFirstLetter(value)
  }

  return str.replace(/([A-Z])/g, ' $1')
}

export const getTextWithOrWithoutColon = (text: string, hasColon: boolean) =>
  hasColon ? text.concat(':') : text

export const getValueOrPlaceholder = (value: string) =>
  value === undefined || value.length < 1 ? '-' : value

export const isSuccessRequest = (status?: number) => {
  return String(status).startsWith('2')
}
