import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import apiService from 'services/apiService'
import { eventLog } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'
import { getLog } from './actions'

export function useEventState(): AppState['eventLog'] {
  return useSelector<AppState, AppState['eventLog']>((state) => state.eventLog)
}

export const getEventLog = async ({
  page,
  path,
  url,
  tokenId,
}: {
  page: number
  path: string
  url: string
  tokenId: number
}) => {
  const response = await apiService.get(`${eventLog.list}?${tokenId ? `tokenId=${tokenId}` : ''}`)
  return response
}

export function useGetEventCallback({ tokenId }: { tokenId: number }): () => Promise<void> {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(async () => {
    dispatch(getLog.pending())
    try {
      const response = await getEventLog({ page: 1, path: '', url: '', tokenId })
      dispatch(getLog.fulfilled({ response: response.data }))
    } catch (error) {
      console.error(`Could not fetch event log`, error)
      dispatch(getLog.rejected({ errorMessage: error.message }))
    }
  }, [dispatch, tokenId])
}
