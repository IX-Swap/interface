import React from 'react'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'
import { Paper } from '@material-ui/core'

export const DigitalSecurities: React.FC = () => {
  const { renderRoutes } = useDSRouter()

  return <Paper>{renderRoutes()}</Paper>
}
