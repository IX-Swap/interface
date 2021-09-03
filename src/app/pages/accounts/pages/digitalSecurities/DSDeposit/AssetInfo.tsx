import React from 'react'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { BalanceDetails } from 'app/components/BalanceDetails'

export const AssetInfo: React.FC = () => {
  const { data, isLoading } = useAllBalances()
  const params = useParams<{ balanceId: string }>()
  const balance = data.map[params.balanceId]

  if (data === undefined || isLoading) {
    return null
  }

  return <BalanceDetails data={balance} />
}
