import { Currency } from '@ixswap1/sdk-core'
import { currencyId } from './currencyId'

export const routes = {
  add: (currency0: Currency, currency1: Currency) => `/add/${currencyId(currency0)}/${currencyId(currency1)}`,
  remove: (currency0: Currency, currency1: Currency) => `/remove/${currencyId(currency0)}/${currencyId(currency1)}`,
  find: '/find',
  pool: '/pool',
  swap: '/swap',
  securityTokens: (currency?: Currency) => `/security-tokens${currency ? `/${currencyId(currency)}` : ''}`,
  farming: '/farming',
}
