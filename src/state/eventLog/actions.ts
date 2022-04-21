import { ActionCreatorWithoutPayload, ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { ActionFilterTabs, ActionTypes } from 'components/Vault/enum'
import { PaginateResponse, PaginationDetails } from 'types/pagination'

export interface TimeStamps {
  createdAt: string
  updatedAt: string | null
  deletedAt: string | null
}
export interface LogItem extends TimeStamps {
  id: number
  type: ActionTypes
  userId?: number | null
  params?: {
    token: string
    tokenId: number
    status: string
  }
  amount?: string | null
  tokenId?: number
  status?: string
  custodianAccountId?: number | null
  custodianType?: string
  deadline?: string
  depositAddress?: string | null
  ethTransactionId?: number | null
  fromAddress?: string | null
  requestId?: null | number
  feeTxHash?: string | null
  feeAmount?: number | null
}

export const setEventLog = createAction<{ eventLog: Array<LogItem> }>('eventLog/setLog')
export const clearEventLog = createAction('eventLog/clearLog')
export const setFilter = createAction<{ filter: ActionTypes }>('eventLog/setFilter')
export const setPage = createAction<{ page: number }>('eventLog/setPage')
export const setTokenId = createAction<{ tokenId: number }>('eventLog/setTokenId')
export const setMultiFilters = createAction<{ tokenId: number; page: number; filter: ActionTypes }>(
  'eventLog/setMultiFilters'
)
export const resetPage = createAction<void>('eventLog/resetPage')
export const setLogItem = createAction<{ logItem: LogItem | null }>('eventLog/setLogItem')

export const setPaginationDetails = createAction<{ paginationDetails: PaginationDetails }>(
  'eventLog/setPaginationDetails'
)

export const getLog: Readonly<{
  pending: ActionCreatorWithoutPayload
  fulfilled: ActionCreatorWithPayload<{
    response: PaginateResponse<LogItem>
    params: { page?: number; filter: ActionFilterTabs; tokenId?: number | null }
  }>
  rejected: ActionCreatorWithPayload<{ errorMessage: string }>
}> = {
  pending: createAction('eventLog/getLog/pending'),
  fulfilled: createAction('eventLog/getLog/fulfilled'),
  rejected: createAction('eventLog/getLog/rejected'),
}
