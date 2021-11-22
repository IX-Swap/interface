import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Currency, CurrencyAmount, Token } from '@ixswap1/sdk-core'
import { FeeAmount } from 'constants/enums'
import { BIG_INT_ZERO } from 'constants/misc'
import { TokenAddressMap } from '../state/lists/hooks'
import JSBI from 'jsbi'
import walletValidator from 'multicoin-address-validator'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    if (walletValidator.validate(value, 'Tezos') || walletValidator.validate(value, 'Algorand')) {
      return value
    }
    return false
  }
}

export const isValidAddress = (value: string): string | false => {
  const isValid = /^0x[a-fA-F0-9]{40}$/.test(value) ? value : false
  if (!isValid) {
    if (walletValidator.validate(value, 'Tezos') || walletValidator.validate(value, 'Algorand')) {
      return value
    }
  }
  return isValid
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(parsed?.length - chars)}`
}

export function shortAddress(address: string, chars = 4): string {
  const parsed = isValidAddress(address)
  if (!parsed) {
    return `Invalid 'address' '${address}'`
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(parsed?.length - chars)}`
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(tokenAddressMap: TokenAddressMap, token?: Token): boolean {
  return Boolean(token?.isToken && tokenAddressMap[token.chainId]?.[token.address])
}

export function formattedFeeAmount(feeAmount: FeeAmount): number {
  return feeAmount / 10000
}
export function isAboveZero(amount: CurrencyAmount<Currency> | undefined) {
  return amount && JSBI.greaterThan(amount?.quotient ?? BIG_INT_ZERO, BIG_INT_ZERO)
}
export function removeProtocolFromUrl(url: string): string {
  return url.replace('http://', '').replace('https://', '')
}
