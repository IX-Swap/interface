import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const typeAmount = createAction<{ typedValue: string }>('withdraw/typeAmount')
export const setNetwork = createAction<{ networkName: string }>('withdraw/setNetwork')
export const typeReceiver = createAction<{ typedValue: string }>('withdraw/typeReceiver')
export const setTransaction = createAction<{ tx: string }>('withdraw/setTransaction')
export const setCurrency = createAction<{ currencyId: string }>('withdraw/setCurrency')
export const resetWithdraw = createAction<undefined>('withdraw/reset')
export const withdrawCurrency: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/withdrawCurrency/pending'),
  fulfilled: createAction('withdraw/withdrawCurrency/fulfilled'),
  rejected: createAction('withdraw/withdrawCurrency/rejected'),
}
