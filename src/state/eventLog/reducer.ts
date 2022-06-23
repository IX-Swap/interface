import { createReducer } from '@reduxjs/toolkit'
import { ActionFilterTabs } from 'components/Vault/enum'
import { PaginationDetails } from 'types/pagination'
import {
  clearEventLog,
  getLog,
  LogItem,
  resetPage,
  setEventLog,
  setFilter,
  setLogItem,
  setMultiFilters,
  setPage,
  setPaginationDetails,
  setTokenId,
} from './actions'

export interface EventLogState {
  eventLog: Array<LogItem>
  filter: ActionFilterTabs
  page: number
  activeEvent: LogItem | null
  paginationDetails: PaginationDetails
  eventLogLoading: boolean
  eventLogError: string | null
  tokenId: number | null
}

const initialState: EventLogState = {
  eventLog: [],
  filter: 'all',
  page: 1,
  tokenId: null,
  paginationDetails: {
    page: 1,
    offset: 0,
    totalItems: 0,
    totalPages: 1,
    itemCount: 0,
    nextPage: 1,
    prevPage: 1,
  },
  eventLogLoading: false,
  eventLogError: null,
  activeEvent: null,
}

export default createReducer<EventLogState>(initialState, (builder) =>
  builder
    .addCase(setEventLog, (state, { payload: { eventLog } }) => {
      return {
        ...state,
        eventLog,
      }
    })
    .addCase(setFilter, (state, { payload: { filter } }) => {
      return {
        ...state,
        filter,
      }
    })
    .addCase(setPage, (state, { payload: { page } }) => {
      return {
        ...state,
        page,
      }
    })
    .addCase(setTokenId, (state, { payload: { tokenId } }) => {
      return {
        ...state,
        tokenId,
      }
    })
    .addCase(setMultiFilters, (state, { payload: { tokenId, page, filter } }) => {
      state.tokenId = tokenId
      state.page = page
      state.filter = filter
    })
    .addCase(resetPage, (state) => {
      state.page = 1
    })
    .addCase(setLogItem, (state, { payload: { logItem } }) => {
      state.activeEvent = logItem
    })
    .addCase(setPaginationDetails, (state, { payload: { paginationDetails } }) => {
      return {
        ...state,
        paginationDetails,
      }
    })
    .addCase(getLog.pending, (state) => {
      state.eventLogLoading = true
      state.eventLogError = null
    })
    .addCase(getLog.fulfilled, (state, { payload: { response, params } }) => {
      state.eventLogLoading = false
      state.eventLog = response.items
      const { offset, totalItems, totalPages, itemCount, nextPage, prevPage } = response
      const { page, filter, tokenId } = params
      state.paginationDetails = { page: page || 1, offset, totalItems, totalPages, itemCount, nextPage, prevPage }
      state.eventLogError = null
      if (page) {
        state.page = page
      }
      if (filter) {
        state.filter = filter
      }
      if (tokenId) {
        state.tokenId = tokenId
      }
    })
    .addCase(getLog.rejected, (state, { payload: { errorMessage } }) => {
      state.eventLogLoading = false
      state.eventLogError = errorMessage
      state.page = 1
    })
    .addCase(clearEventLog, (state) => {
      state.eventLog = []
      state.activeEvent = null
    })
)
