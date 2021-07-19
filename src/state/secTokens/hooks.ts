import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tokens } from 'services/apiUrls'
import { useApiService } from 'services/useApiService'
import { AppDispatch, AppState } from 'state'
import { SecToken } from 'types/secToken'
import { saveTokens } from './actions'

export function useSecTokenState(): AppState['secTokens'] {
  return useSelector<AppState, AppState['secTokens']>((state) => state.secTokens)
}
export const useFetchSecTokens = () => {
  const { result, loading, request } = useApiService<SecToken[]>({ method: 'get', uri: tokens.all, data: {} })
  return { result, loading, request }
}
export const useSecTokens = () => {
  const { onSaveSecTokens } = useSecTokensHandlers()
  const { tokens } = useSecTokenState()
  const { result, request } = useFetchSecTokens()
  useEffect(() => {
    request()
  }, [])

  useEffect(() => {
    if (result) {
      onSaveSecTokens(result)
    }
  }, [result, onSaveSecTokens])
  return { tokens }
}

export function useSecTokensHandlers(): {
  onSaveSecTokens: (tokens: SecToken[]) => void
} {
  const dispatch = useDispatch<AppDispatch>()

  const onSaveSecTokens = useCallback(
    (tokens: SecToken[]) => {
      dispatch(saveTokens({ tokens }))
    },
    [dispatch]
  )

  return {
    onSaveSecTokens,
  }
}
