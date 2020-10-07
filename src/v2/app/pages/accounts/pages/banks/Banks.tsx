import React from 'react'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { Paper } from '@material-ui/core'

export const Banks: React.FC = () => {
  const { renderRoutes } = useBanksRouter()

  return <Paper>{renderRoutes()}</Paper>
}
