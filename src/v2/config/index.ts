import { Bank } from '../types/bank'

export const API_URL = process.env.REACT_APP_API_URL ?? ''

export const DATE_FORMAT = 'MM/DD/YYYY'
export const TIME_FORMAT = 'HH:MM:SS'

export const INVESTAX_BANK: Partial<Bank> = {
  bankName: 'OVERSEA-CHINESE BANKING CORPORATION LIMITED',
  swiftCode: 'OCBCSGSG',
  accountHolderName: 'IC SG PTE LTD',
  bankAccountNumber: '501123956001',
  address: {
    line1: 'OCBC Centre, Floor 9, 65 Chulia Street, Singapore 049513'
  }
}

export const ENDPOINT_URL = {
  EXCHANGE_API: {
    GET_MARKET_LIST: '/exchange/markets/list'
  },
  SUBSCRIBE_API: {
    ORDER_BOOK: {
      emit: 'orderbook/get',
      on: 'orderbook'
    },
    MY_ORDERS: {
      emit: 'myorders/get',
      on: 'myorders'
    },
    TRADE_HISTORY: {
      emit: 'fills/get',
      on: 'fills'
    },
    BIDS_ASKS: {
      emit: 'balances/get',
      on: 'balances'
    },
    LAST_PRICE: {
      emit: 'price/get',
      on: 'price'
    },
    CHART: {
      emit: 'chart/get',
      on: 'chart'
    }
  }
}
