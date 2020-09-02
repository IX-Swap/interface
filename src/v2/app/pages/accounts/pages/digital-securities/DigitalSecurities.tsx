import React from 'react'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digital-securities/router'
import { Box, Grid, Paper } from '@material-ui/core'
import PageTitle from 'v2/app/components/page-title'

export const DigitalSecurities: React.FC = () => {
  const { renderRoutes, current, routes } = useDSRouter()

  return (
    <Grid container direction='column'>
      {current.path !== routes.list && (
        <PageTitle subPage title={current.label} />
      )}
      <Box my={2} />
      <Grid item>
        <Paper>{renderRoutes()}</Paper>
      </Grid>
    </Grid>
  )
}
