import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { useParams, useLocation } from 'react-router-dom'
import { PaginatedData } from 'services/api/types'
import { AppFeature } from 'types/app'
import { CashWithdrawal } from 'types/cashWithdrawal'
import { WithdrawalPreview } from 'app/components/WithdrawalPreview/WithdrawalPreview'
import { isEmptyString } from 'helpers/strings'

export const CashWithdrawalAuthorization = (props: any) => {
  const history = useLocation()
  const status = history.pathname.split('/')[6]
  const { apiService } = useServices()
  const { cashWithdrawalId } = useParams<{
    cashWithdrawalId: string
    userId: string
  }>()
  const uri = '/accounts/cash/withdrawals'
  let paginationArgsWithStatus = { ...paginationArgs, status: status ? status : 'SUBMITTED' }
  const fetcher = async () => {
    return await apiService.post<PaginatedData<any>>(
      uri,
      paginationArgsWithStatus
    )
  }

  const { data, isLoading } = useInfiniteQuery([uri], fetcher)
  const { map } = useParsedData<CashWithdrawal>(data, '_id')
  if (isLoading || data === undefined) {
    return null
  }
  const cashWithdrawal =
    !isEmptyString(cashWithdrawalId) && map ? map[cashWithdrawalId] : undefined

  if (cashWithdrawal == null) return null
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
