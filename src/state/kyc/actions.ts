import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const fetchCreateIndividualKYC: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('kyc/createIndividual/pending'),
  fulfilled: createAction('kyc/createIndividual/fulfilled'),
  rejected: createAction('kyc/createIndividual/rejected'),
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
