import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'

export const fetchAddIssuer: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('secCatalog/createIssuer/pending'),
  fulfilled: createAction('secCatalog/createIssuer/fulfilled'),
  rejected: createAction('secCatalog/createIssuer/rejected'),
}

export const fetchEditIssuer: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('secCatalog/editIssuer/pending'),
  fulfilled: createAction('secCatalog/editIssuer/fulfilled'),
  rejected: createAction('secCatalog/editIssuer/rejected'),
}

export const fetchIssuers: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<any>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('secCatalog/getIssuers/pending'),
  fulfilled: createAction('secCatalog/getIssuers/fulfilled'),
  rejected: createAction('secCatalog/getIssuers/rejected'),
}
