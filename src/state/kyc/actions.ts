import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const createKYC: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('kyc/createKYC/pending'),
  fulfilled: createAction('kyc/createKYC/fulfilled'),
  rejected: createAction('kyc/createKYC/rejected'),
}

export const fetchGetMyKyc: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('kyc/getMyKyc/pending'),
  fulfilled: createAction('kyc/getMyKyc/fulfilled'),
  rejected: createAction('kyc/getMyKyc/rejected'),
}

export const updateKYC: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('kyc/updateKYC/pending'),
  fulfilled: createAction('kyc/updateKYC/fulfilled'),
  rejected: createAction('kyc/updateKYC/rejected'),
}
