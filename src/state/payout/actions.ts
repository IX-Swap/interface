import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

import { PayoutList } from 'state/token-manager/types'

export const createDraft: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/createDraft/pending'),
  fulfilled: createAction('payout/createDraft/fulfilled'),
  rejected: createAction('payout/createDraft/rejected'),
}

export const getPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: PayoutList }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getPayoutList/pending'),
  fulfilled: createAction('payout/getPayoutList/fulfilled'),
  rejected: createAction('payout/getPayoutList/rejected'),
}

export const getMyPayoutList: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: PayoutList; type: string }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getMyPayoutList/pending'),
  fulfilled: createAction('payout/getMyPayoutList/fulfilled'),
  rejected: createAction('payout/getMyPayoutList/rejected'),
}

export const getPayoutItem: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getPayoutItem/pending'),
  fulfilled: createAction('payout/getPayoutItem/fulfilled'),
  rejected: createAction('payout/getPayoutItem/rejected'),
}

export const deletePayoutItem: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/deletePayoutItem/pending'),
  fulfilled: createAction('payout/deletePayoutItem/fulfilled'),
  rejected: createAction('payout/deletePayoutItem/rejected'),
}

export const setPayoutValidation: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/setPayoutValidation/pending'),
  fulfilled: createAction('payout/setPayoutValidation/fulfilled'),
  rejected: createAction('payout/setPayoutValidation/rejected'),
}

export const saveUserClaim: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/saveUserClaim/pending'),
  fulfilled: createAction('payout/saveUserClaim/fulfilled'),
  rejected: createAction('payout/saveUserClaim/rejected'),
}

export const getUserClaim: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getUserClaim/pending'),
  fulfilled: createAction('payout/getUserClaim/fulfilled'),
  rejected: createAction('payout/getUserClaim/rejected'),
}

export const getTotalClaims: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getTotalClaims/pending'),
  fulfilled: createAction('payout/getTotalClaims/fulfilled'),
  rejected: createAction('payout/getTotalClaims/rejected'),
}

export const getClaimAuthorization: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('payout/getClaimAuthorization/pending'),
  fulfilled: createAction('payout/getClaimAuthorization/fulfilled'),
  rejected: createAction('payout/getClaimAuthorization/rejected'),
}
