import React from 'react'
import { useBanksRouter } from 'app/pages/accounts/pages/banks/router'

export const Banks: React.FC = () => {
  const { renderRoutes } = useBanksRouter()

  return renderRoutes()
}
