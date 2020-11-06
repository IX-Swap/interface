import { Bank } from '../types/bank'

export const API_URL = process.env.REACT_APP_API_URL ?? ''
export const SOCKET_TRANSPORTS = (
  process.env.REACT_APP_SOCKET_TRANSPORTS ?? 'websocket'
).split(',')

export const DATE_FORMAT = 'MM/DD/YYYY'
export const TIME_FORMAT = 'HH:MM:SS'

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
