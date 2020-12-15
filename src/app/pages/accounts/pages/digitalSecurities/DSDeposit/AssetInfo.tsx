import React from 'react'
import { useDSRouter } from 'app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'hooks/balance/useAllBalances'
import { BalanceDetails } from 'app/components/BalanceDetails'

export const AssetInfo: React.FC = () => {
  const {
    params: { balanceId }
  } = useDSRouter()
  const { data, isLoading } = useAllBalances()
  const balance = data.map[balanceId]

  if (isLoading) {
    return null
  }

  return <BalanceDetails data={balance} />
}
