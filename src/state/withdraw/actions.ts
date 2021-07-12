import { createAction } from '@reduxjs/toolkit'

export const typeAmount = createAction<{ typedValue: string }>('withdraw/typeAmount')
export const typeReceiver = createAction<{ typedValue: string }>('withdraw/typeReceiver')
export const setCurrency = createAction<{ currencyId: string }>('withdraw/setCurrency')
