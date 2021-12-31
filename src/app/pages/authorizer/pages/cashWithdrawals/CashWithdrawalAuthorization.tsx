import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { PaginatedData } from 'services/api/types'
import { AppFeature } from 'types/app'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { WithdrawalPreview } from 'app/components/WithdrawalPreview/WithdrawalPreview'

export const CashWithdrawalAuthorization = () => {
  const { apiService } = useServices()
  const { cashWithdrawalId } = useParams<{
    cashWithdrawalId: string
    userId: string
  }>()

  const uri = '/accounts/cash/withdrawals'
  const fetcher = async () => {
    return await apiService.post<PaginatedData<any>>(uri, paginationArgs)
  }

  const { data, isLoading } = useInfiniteQuery([uri], fetcher)
  const { map } = useParsedData<CashWithdrawal>(data, '_id')

  if (isLoading || data === undefined) {
    return null
  }

  const cashWithdrawal = map[cashWithdrawalId]

  return (
    <AuthorizerView
      title={cashWithdrawal.bank.bankName}
      data={cashWithdrawal}
      feature={AppFeature.CashWithdrawals}
    >
      <WithdrawalPreview data={cashWithdrawal} />
    </AuthorizerView>
  )
}
