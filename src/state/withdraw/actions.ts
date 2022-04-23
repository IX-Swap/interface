import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { WithdrawStatus } from './reducer'

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

export const getWithdrawStatus: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<WithdrawStatus>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/getFeeStatus/pending'),
  fulfilled: createAction('withdraw/getFeeStatus/fulfilled'),
  rejected: createAction('withdraw/getFeeStatus/rejected'),
}

export const getFeePrice: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<string>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/getFeePrice/pending'),
  fulfilled: createAction('withdraw/getFeePrice/fulfilled'),
  rejected: createAction('withdraw/getFeePrice/rejected'),
}

export const postPaidFee: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<WithdrawStatus>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/postPaidFee/pending'),
  fulfilled: createAction('withdraw/postPaidFee/fulfilled'),
  rejected: createAction('withdraw/postPaidFee/rejected'),
}

export const postCreateDraftWithdraw: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<WithdrawStatus>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/postCreateDraftWithdraw/pending'),
  fulfilled: createAction('withdraw/postCreateDraftWithdraw/fulfilled'),
  rejected: createAction('withdraw/postCreateDraftWithdraw/rejected'),
}

export const payFee: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('withdraw/payFee/pending'),
  fulfilled: createAction('withdraw/payFee/fulfilled'),
  rejected: createAction('withdraw/payFee/rejected'),
}
