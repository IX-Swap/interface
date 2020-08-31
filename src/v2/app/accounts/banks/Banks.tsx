import React from 'react'
import { useBanksRouter } from 'v2/app/accounts/banks/router'
import PageTitle from 'v2/app/components/page-title'
import { Box, Grid, Paper } from '@material-ui/core'

export const Banks: React.FC = () => {
  const { renderRoutes, current, routes } = useBanksRouter()

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
