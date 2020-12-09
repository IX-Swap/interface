import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { getIdFromObj } from 'helpers/strings'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { CustomField } from 'types/user'

export interface UseCustomFieldArgs {
  service: string
  feature: string
}

export const useCustomField = (args: UseCustomFieldArgs) => {
  const { service, feature } = args
  const { apiService } = useServices()
  const { user } = useAuth()

  const fetchCustomFields = async () => {
    return await apiService.get<CustomField>(
      userURL.getCustomFields(getIdFromObj(user), service, feature)
    )
  }

  const { data, ...rest } = useQuery(
    usersQueryKeys.getCustomFields(service, feature),
    fetchCustomFields
  )

  return {
    ...rest,
    data: data?.data
  }
}
