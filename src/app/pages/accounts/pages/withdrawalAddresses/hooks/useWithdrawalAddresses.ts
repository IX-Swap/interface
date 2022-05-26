import { useInfiniteQuery } from 'react-query'
import { useAuth } from 'hooks/auth/useAuth'
import { useServices } from 'hooks/useServices'
import { getIdFromObj } from 'helpers/strings'
import { paginationArgs } from 'config/defaults'
import { PaginatedData } from 'services/api/types'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import { GetWithdrawalAddressesArgs } from 'app/pages/accounts/types'
import { useParsedData, UsePaginatedQueryData } from 'hooks/useParsedData'
import { AuthorizableStatus } from 'types/util'
import { withdrawalAddressQueryKeys } from 'config/queryKeys'
import { accountsURL } from 'config/apiURL'

interface Props {
  status?: AuthorizableStatus
}

export const useWithdrawalAddresses = ({
  status = 'Approved'
}: Props): UsePaginatedQueryData<WithdrawalAddress> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = accountsURL.withdrawalAddresses.getAll(getIdFromObj(user))

  const getAllWithdrawalAddresses = async (
    queryKey: string,
    args: GetWithdrawalAddressesArgs
  ) => await apiService.post<PaginatedData<WithdrawalAddress>>(uri, args)

  const { data, ...queryResult } = useInfiniteQuery(
    [withdrawalAddressQueryKeys.getAddresses, { ...paginationArgs, status }],
    getAllWithdrawalAddresses
  )

  return {
    ...queryResult,
    data: useParsedData<WithdrawalAddress>(data, '_id')
  }
}
