import { t } from '@lingui/macro'
import { SupportedChainId } from 'constants/chains'
import { PERIOD } from './reducer'

export const POOL_SIZE_LIMITS: {
  [key in SupportedChainId]: {
    [period in PERIOD]: string
  }
} = {
  [SupportedChainId.MAINNET]: {
    [PERIOD.ONE_WEEK]: '2000000',
    [PERIOD.ONE_MONTH]: '2000000',
    [PERIOD.TWO_MONTHS]: '1000000',
    [PERIOD.THREE_MONTHS]: '2000000',
  },
  [SupportedChainId.KOVAN]: {
    [PERIOD.ONE_WEEK]: '2000000',
    [PERIOD.ONE_MONTH]: '2000000',
    [PERIOD.TWO_MONTHS]: '2000000',
    [PERIOD.THREE_MONTHS]: '2000000',
  },
  [SupportedChainId.MATIC]: {
    [PERIOD.ONE_WEEK]: '2000000',
    [PERIOD.ONE_MONTH]: '500000',
    [PERIOD.TWO_MONTHS]: '1000000',
    [PERIOD.THREE_MONTHS]: '500000',
  },
  [SupportedChainId.MUMBAI]: {
    [PERIOD.ONE_WEEK]: '2000000',
    [PERIOD.ONE_MONTH]: '500000',
    [PERIOD.TWO_MONTHS]: '1000000',
    [PERIOD.THREE_MONTHS]: '500000',
  },
}

export const POOL_SIZE_LIMIT_TEXTS: {
  [key in SupportedChainId]: {
    [period in PERIOD]: string
  }
} = {
  [SupportedChainId.MAINNET]: {
    [PERIOD.ONE_WEEK]: t`Unlimited`,
    [PERIOD.ONE_MONTH]: t`2 mln`,
    [PERIOD.TWO_MONTHS]: t`1 mln`,
    [PERIOD.THREE_MONTHS]: t`2 mln`,
  },
  [SupportedChainId.KOVAN]: {
    [PERIOD.ONE_WEEK]: t`Unlimited`,
    [PERIOD.ONE_MONTH]: t`2 mln`,
    [PERIOD.TWO_MONTHS]: t`2 mln`,
    [PERIOD.THREE_MONTHS]: t`2 mln`,
  },
  [SupportedChainId.MATIC]: {
    [PERIOD.ONE_WEEK]: t`Unlimited`,
    [PERIOD.ONE_MONTH]: t`500k`,
    [PERIOD.TWO_MONTHS]: t`1 mln`,
    [PERIOD.THREE_MONTHS]: t`500k`,
  },
  [SupportedChainId.MUMBAI]: {
    [PERIOD.ONE_WEEK]: t`Unlimited`,
    [PERIOD.ONE_MONTH]: t`500k`,
    [PERIOD.TWO_MONTHS]: t`1 mln`,
    [PERIOD.THREE_MONTHS]: t`500k`,
  },
}
