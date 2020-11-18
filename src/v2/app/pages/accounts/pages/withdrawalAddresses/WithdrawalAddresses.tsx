import React from 'react'
import { useWithdrawalAddressesRouter } from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'

export const WithdrawalAddresses: React.FC = () => {
  const { renderRoutes } = useWithdrawalAddressesRouter()

  return renderRoutes()
}
