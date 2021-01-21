import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { hasValue } from 'helpers/forms'
import { UseQueryData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'

export interface User {
  _id: string
  verified: boolean
  totpConfirmed: boolean
  email: string
  name: string
  roles: string
  resetExpiresOn?: string
  enabled: boolean
  twoFactorAuth: boolean
  isResetActive: boolean
  createdAt: string
  updatedAt: string
}

export const useUserById = (userId: string): UseQueryData<User> => {
  const { apiService } = useServices()
  const getUserData = async () =>
    await apiService.get<User>(userURL.getUserById(userId))

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
