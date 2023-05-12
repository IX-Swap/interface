import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PaginatedData } from 'services/api/types'
import { AppFeature } from 'types/app'
import { DSWithdrawal } from 'types/dsWithdrawal'
import { DSWithdrawalPreview } from 'app/components/DSWithdrawalPreview/DSWithdrawalPreview'
import { isEmptyString } from 'helpers/strings'

export const DSWithdrawalAuthorization = () => {
  const { apiService } = useServices()
  const { dsWithdrawalId } = useParams<{
    dsWithdrawalId: string
    userId: string
  }>()

  const uri = '/accounts/security/withdrawals'
  const fetcher = async () => {
    return await apiService.post<PaginatedData<DSWithdrawal>>(
      uri,
      paginationArgs
    )
  }

  const { data, isLoading } = useInfiniteQuery([uri], fetcher)
  const { map } = useParsedData<DSWithdrawal>(data, '_id')

  if (isLoading || data === undefined) {
    return null
  }

  const dsWithdrawal = !isEmptyString(dsWithdrawalId)
    ? map[dsWithdrawalId]
    : undefined

  if (dsWithdrawal == null) {
    // TODO handle not found case
    return null
  }

  return (
    <AuthorizerView
      title={dsWithdrawal._id}
      data={dsWithdrawal}
      feature={AppFeature.SecurityTokenWithdrawals}
    >
      <DSWithdrawalPreview data={dsWithdrawal} />
    </AuthorizerView>
  )
}
