import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { hasValue } from 'helpers/forms'
import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ManagedUser } from 'types/user'

export const useUserById = (userId?: string): UseQueryData<ManagedUser> => {
  const { apiService } = useServices()
  const getUserData = async () =>
    await apiService.get<ManagedUser>(userURL.getUserById(userId))

  const { data, ...rest } = useQuery(
    usersQueryKeys.getUserById(userId),
    getUserData,
    { enabled: hasValue(userId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
