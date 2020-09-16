import React from 'react'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { Grid, Container } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'

export const Accounts: React.FC = () => {
  const { renderRoutes, current } = useAccountsRouter()

  return (
    <Container>
      <Grid container title='Accounts' direction='column'>
        <Grid item>
          <PageTitle title={current.label} />
        </Grid>
        <Grid item>{renderRoutes()}</Grid>
      </Grid>
    </Container>
  )
}
