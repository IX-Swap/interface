import { useInfiniteQuery } from 'react-query'
import { useAuth } from 'v2/hooks/auth/useAuth'
import { useServices } from 'v2/hooks/useServices'
import { getIdFromObj } from 'v2/helpers/strings'
import { paginationArgs } from 'v2/config/defaults'
import { PaginatedData } from 'v2/services/api/types'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'
import { GetWithdrawalAddressesArgs } from 'v2/app/pages/accounts/types'
import { useParsedData, UsePaginatedQueryData } from 'v2/hooks/useParsedData'

export const WITHDRAWAL_ADDRESSES_QUERY_KEY = 'withdrawalAddresses'

export const useWithdrawalAddresses = (): UsePaginatedQueryData<
  WithdrawalAddress
> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = `/accounts/withdrawal-addresses/list/${getIdFromObj(user)}`

  const getAllWithdrawalAddresses = async (
    queryKey: string,
    args: GetWithdrawalAddressesArgs
  ) => await apiService.post<PaginatedData<WithdrawalAddress>>(uri, args)

  const { data, ...queryResult } = useInfiniteQuery(
    [WITHDRAWAL_ADDRESSES_QUERY_KEY, paginationArgs],
    getAllWithdrawalAddresses
  )

  return {
    ...queryResult,
    data: useParsedData<WithdrawalAddress>(data, '_id')
  }
}
