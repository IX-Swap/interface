import { accountsURL } from 'config/apiURL'
import { reportsQueryKeys } from 'config/queryKeys'
import { useServices } from 'hooks/useServices'
import { useQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { getIdFromObj } from 'helpers/strings'
import { AccountInfo } from 'types/reports'

export const useGetAccountInfo = () => {
  const { user } = useAuth()
  const userId = getIdFromObj(user)
  const { apiService } = useServices()

  const getAccountInfo = async () => {
    const uri = accountsURL.reports.getAccountInfo(userId)
    return await apiService.get<AccountInfo>(uri)
  }

  const { data, ...rest } = useQuery(
    [reportsQueryKeys.getAccountInfo, { userId }],
    getAccountInfo
  )

  return {
    ...rest,
    data: data?.data
  }
}
