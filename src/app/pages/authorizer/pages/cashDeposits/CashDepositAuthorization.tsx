import React from 'react'
import { DepositView } from 'app/components/DepositView/DepositView'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { paginationArgs } from 'config/defaults'
import { useParsedData } from 'hooks/useParsedData'
import { useServices } from 'hooks/useServices'
import { useInfiniteQuery } from 'react-query'
import { useParams } from 'react-router'
import { PaginatedData } from 'services/api/types'
import { AppFeature } from 'types/app'
import { CashDeposit } from 'types/cashDeposit'

export const CashDepositAuthorization = () => {
  const { apiService } = useServices()
  const { cashDepositId } = useParams<{
    cashDepositId: string
    userId: string
  }>()

  const uri = '/accounts/cash/deposits'
  const fetcher = async () => {
    return await apiService.post<PaginatedData<any>>(uri, paginationArgs)
  }

  const { data, isLoading } = useInfiniteQuery([uri], fetcher)
  const { map } = useParsedData<CashDeposit>(data, '_id')

  if (isLoading || data === undefined) {
    return null
  }

  const cashDeposit = map[cashDepositId]

  return (
    <AuthorizerView
      title={cashDeposit.depositCode}
      data={cashDeposit}
      feature={AppFeature.CashDeposits}
    >
      <DepositView data={cashDeposit} />
    </AuthorizerView>
  )
}
