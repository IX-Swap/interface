import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import apiService from 'services/apiService'
import { whitelabel } from 'services/apiUrls'
import { AppDispatch, AppState } from 'state'

import { getWhitelabelConfig } from './actions'

export function useWhitelabelState(): AppState['whitelabel'] {
  return useSelector<AppState, AppState['whitelabel']>((state) => state.whitelabel)
}

export const getWhitelabelConfigReq = async () => {
  const response = await apiService.get(whitelabel.config)
  return response.data
}

export const useGetWihitelabelConfig = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      dispatch(getWhitelabelConfig.pending())
      const response = await getWhitelabelConfigReq()
      dispatch(getWhitelabelConfig.fulfilled(response))
    } catch (error: any) {
      dispatch(getWhitelabelConfig.rejected({ errorMessage: error.message }))
    }
  }, [dispatch])
}
