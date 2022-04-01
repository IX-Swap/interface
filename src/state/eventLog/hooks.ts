import { ActionFilterTabs, ActionTypes } from 'components/Vault/enum'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { custody, eventLog } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { getLog, setFilter } from './actions'

export function useEventState(): AppState['eventLog'] {
  return useSelector<AppState, AppState['eventLog']>((state) => state.eventLog)
}

export const getEventLog = async ({
  page,
  filter,
  tokenId,
}: {
  tokenId?: number | null
  page?: number
  filter?: ActionTypes
}) => {
  return await apiService.get(eventLog.list({ tokenId, filter, page }))
}

export const getTransactionLog = async ({
  page,
  filter,
  tokenId,
}: {
  tokenId?: number | null
  page?: number
  filter?: ActionFilterTabs
}) => {
  return await apiService.get(custody.requests({ tokenId, filter, page }))
}

export function useGetEventCallback(): ({
  tokenId,
  filter,
  page,
}: {
  tokenId?: number | null
  page?: number
  filter: ActionFilterTabs
}) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    async ({ tokenId, filter, page = 1 }) => {
      dispatch(getLog.pending())
      try {
        const params = { page, tokenId, filter }
        const response = await getTransactionLog(params)
        dispatch(getLog.fulfilled({ response: response.data, params }))
      } catch (error: any) {
        console.error(`Could not fetch event list`, error)
        dispatch(getLog.rejected({ errorMessage: error?.message }))
      }
    },
    [dispatch]
  )
}

export function useEventActionHandlers(): {
  onChangeFilter: (filter: ActionTypes) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const { filter: filterState } = useEventState()
  const onChangeFilter = useCallback(
    (filter: ActionTypes) => {
      if (filterState !== filter) {
        dispatch(setFilter({ filter }))
      }
    },
    [dispatch, filterState]
  )

  return {
    onChangeFilter,
  }
}
