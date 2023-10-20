import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { hasValue } from 'helpers/forms'
import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { ManagedUser } from 'types/user'

export const useUserByAccountId = (
  accountId?: string
): UseQueryData<ManagedUser> => {
  const { apiService } = useServices()
  const getUserData = async () =>
    await apiService.get<ManagedUser>(userURL.getUserByAccountId(accountId))

  const { data, ...rest } = useQuery(
    usersQueryKeys.getUserByAccountId(accountId),
    getUserData,
    { enabled: hasValue(accountId) }
  )

  return {
    ...rest,
    data: data?.data
  }
}
