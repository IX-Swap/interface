import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { WhitelistFilter } from 'services/types'
import { PaginateResponse } from 'types/pagination'
import { WhitelistWallet } from './types'

export const getWhitelistedWallets: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{ data: PaginateResponse<WhitelistWallet> }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('issuance/getWhitelistedWallets/pending'),
  fulfilled: createAction('issuance/getWhitelistedWallets/fulfilled'),
  rejected: createAction('issuance/getWhitelistedWallets/rejected'),
}

export const saveWhitelistedWallet: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('issuance/saveWhitelistedWallet/pending'),
  fulfilled: createAction('issuance/saveWhitelistedWallet/fulfilled'),
  rejected: createAction('issuance/saveWhitelistedWallet/rejected'),
}

export const deleteWhitelistedWallet: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithoutPayload
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('issuance/deleteWhitelistedWallet/pending'),
  fulfilled: createAction('issuance/deleteWhitelistedWallet/fulfilled'),
  rejected: createAction('issuance/deleteWhitelistedWallet/rejected'),
}

export const setFilterValue = createAction<{ filter?: WhitelistFilter }>('issuance/setFilterValue')
export const resetWhitelistWalletErrors = createAction('issuance/resetWhitelistWalletErrors')
