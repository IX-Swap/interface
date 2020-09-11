import { UseQueryData } from 'v2/hooks/useParsedData'
import User from 'v2/types/user'
import { useServices } from 'v2/services/useServices'
import { useQuery } from 'react-query'

export const USER_QUERY_KEY = 'user'

export const useUser = (): UseQueryData<User> => {
  const { authService, storageService } = useServices()
  const user = storageService.get<User>('user')
  const { data, ...rest } = useQuery(
    [USER_QUERY_KEY, { userId: user?._id }],
    authService.getUser.bind(authService)
  )

  return {
    ...rest,
    data: data?.data
  }
}
