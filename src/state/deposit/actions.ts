import { createAction } from '@reduxjs/toolkit'

export enum Field {
  AMOUNT = 'AMOUNT',
  SENDER = 'SENDER',
}

export const typeAmount = createAction<{ typedValue: string }>('deposit/typeAmount')
export const typeSender = createAction<{ typedValue: string }>('deposit/typeSender')
export const setCurrency = createAction<{ currencyId: string }>('deposit/setCurrency')
