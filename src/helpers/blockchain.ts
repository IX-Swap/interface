import { getAddress } from '@ethersproject/address'
import { isString } from 'lodash'
import { isTruthy } from './strings'

export function getEthChainAddress(value: any): string | false {
  if (!isTruthy(value)) {
    return false
  }
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

// returns the checksummed address if the address is valid, otherwise returns false
export function getValidAddress(value: any): string | false {
  const address = getEthChainAddress(value)
  return isString(address) ? value : false
}

// For invalid addreses we return empty string. For eth, algorand, tezos we shorten it
export function shortenAddress(address?: string, chars = 4): string {
  const parsed = getValidAddress(address)
  if (parsed === false || parsed === '') {
    return ''
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(
    parsed?.length - chars
  )}`
}
