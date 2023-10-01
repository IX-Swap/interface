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
import { NETWORK_ADDRESS_PATTERNS } from 'state/wallet/constants'

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  if (!value) {
    return false
  }
  try {
    return getAddress(value)
  } catch {
    if (walletValidator.validate(value, 'Tezos') || walletValidator.validate(value, 'Algorand')) {
      return value
    }
    return false
  }
}

export function isExternalAddress(value: any, network?: string): string | false {
  if (!value) {
    return false
  }
  try {
    return getAddress(value)
  } catch {
    if (network) {
      return manualValidation(value, network) ? value : false
    } else if (walletValidator.validate(value, 'Tezos') || walletValidator.validate(value, 'Algorand')) {
      return value
    }
    return false
  }
}

const manualValidation = (address: string, network: string) => {
  const expressions = NETWORK_ADDRESS_PATTERNS[network]

  return expressions[0].test(address)
  /*if (!expressions[0].test(address)) {
    return false;
  }

  if (expressions[1].test(address) || expressions[2].test(address)) {
    // If it's all small caps or all all caps, return true
    return true;
  }

  return false;*/
}

export function isEthChainAddress(value: any): string | false {
  if (!value) {
    return false
  }
  try {
    return getAddress(value)
  } catch {
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
export function shortenAddress(address: string, chars = 4, network?: string): string {
  if (!address) {
    return ''
  }
  const parsed = network ? isExternalAddress(address, network) : isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' '${address}'`)
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
export function getSigner(provider: Web3Provider, account: string): JsonRpcSigner {
  return provider.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(provider: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(provider, account) : provider
}

// account is optional
export function getContract(address: string, ABI: any, provider: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(provider, account) as any)
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
