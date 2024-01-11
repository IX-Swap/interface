import { Bank } from 'types/bank'
import { getAPIUrl, getEnvironment, getSocketTransports } from './utils'

export const API_URL = getAPIUrl(process.env.IXSP_REACT_APP_API_URL)
export const PRIME_URL = process.env.PRIME_URL ?? 'https://prime.investax.io'
export const WEBSITE_URL = process.env.WEBSITE_URL ?? 'https://investax.io'
export const SOCKET_TRANSPORTS = getSocketTransports(
  process.env.REACT_APP_SOCKET_TRANSPORTS
)
export const ENVIRONMENT = getEnvironment(API_URL)
export const FULLSTORY = process.env.REACT_APP_FULLSTORY
export const GAS = process.env.REACT_APP_GAS ?? 'low'
export const isDevEnv = ENVIRONMENT === 'dev'
export const isProdEnv = ENVIRONMENT === 'prime'
export const DATE_FORMAT = 'MM/DD/YYYY'
export const TIME_FORMAT = 'HH:MM:SS'

export const ETHEREUM_DECIMAL_PLACES = 18

export const GA_ID = 'G-F7RSTN1MVC'

export const INVESTAX_BANK: Partial<Bank> = {
  bankName: 'OVERSEA-CHINESE BANKING CORPORATION LIMITED',
  swiftCode: 'OCBCSGSG',
  accountHolderName: 'IC SG PTE LTD',
  bankAccountNumber: '501123956001',
  address: {
    line1: 'OCBC Centre, Floor 9, 65 Chulia Street',
    line2: '',
    postalCode: '049513',
    state: '',
    country: 'Singapore',
    city: 'Singapore'
  }
}

export const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_KEY
