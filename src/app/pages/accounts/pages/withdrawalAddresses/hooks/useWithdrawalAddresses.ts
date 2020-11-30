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

export const WITHDRAWAL_ADDRESSES_QUERY_KEY = 'withdrawalAddresses'

interface Props {
  network?: string
  status?: AuthorizableStatus
}

export const useWithdrawalAddresses = ({
  network,
  status = 'Approved'
}: Props): UsePaginatedQueryData<WithdrawalAddress> => {
  const { apiService } = useServices()
  const { user } = useAuth()
  const uri = `/accounts/withdrawal-addresses/list/${getIdFromObj(user)}`

  const getAllWithdrawalAddresses = async (
    queryKey: string,
    args: GetWithdrawalAddressesArgs
  ) => await apiService.post<PaginatedData<WithdrawalAddress>>(uri, args)

  const { data, ...queryResult } = useInfiniteQuery(
    [WITHDRAWAL_ADDRESSES_QUERY_KEY, { ...paginationArgs, network, status }],
    getAllWithdrawalAddresses
  )

  return {
    ...queryResult,
    data: useParsedData<WithdrawalAddress>(data, '_id')
  }
}
