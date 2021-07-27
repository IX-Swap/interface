import { ActionTypes } from 'components/Vault/enum'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { eventLog } from 'services/apiUrls'
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
  let filters = ''
  if (tokenId) {
    filters += `tokenId=${tokenId}`
  }
  if (filter) {
    const filterText = filter === ActionTypes.ACCREDITATION ? `${filter},kyc` : filter
    filters += `${tokenId ? '&' : ''}eventType=${filterText}`
  }
  if (page) {
    filters += `${tokenId || filter ? '&' : ''}page=${page}`
  }
  const response = await apiService.get(`${eventLog.list}?${filters}`)
  return response
}

export function useGetEventCallback(): ({
  tokenId,
  filter,
  page,
}: {
  tokenId?: number | null
  page?: number
  filter?: ActionTypes
}) => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    async ({ tokenId, filter, page = 1 }) => {
      dispatch(getLog.pending())
      try {
        const params = { page, tokenId, filter }
        const response = await getEventLog(params)
        dispatch(getLog.fulfilled({ response: response.data, params }))
      } catch (error) {
        console.error(`Could not fetch event log`, error)
        dispatch(getLog.rejected({ errorMessage: error.message }))
      }
    },
    [dispatch]
  )
}

export function useEventActionHandlers(): {
  onChangeFilter: (filter: ActionTypes) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const { filter: filterState, page } = useEventState()
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
