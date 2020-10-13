import React from 'react'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { BalanceDetails } from 'v2/app/components/BalanceDetails'

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
