import { useHistory, useLocation } from 'react-router-dom'

// returns an object of params
export const useQueryParams = <T>(keys: string[]) => {
  const queryParams = useLocation<T>()
  const params = new URLSearchParams(queryParams.search)
  const objectParams = keys.reduce(
    (acc, current) => ({
      ...acc,
      [current]: params.get(current),
    }),
    {} as T
  )
  return { objectParams, params }
}

export const useSetQueryParams = <T>(keys: string[]) => {
  const history = useHistory()
  const { params } = useQueryParams<T>(keys)
  const setQueryParams = (query: T) => {
    history.push({
      ...params,
      search: `?${new URLSearchParams(query as unknown as Record<'string', 'string'>).toString()}`,
    })
  }
  return setQueryParams
}
