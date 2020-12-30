import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'
import { Button, Grid } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export const DSOList = () => {
  const { paths } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item container justify='flex-end'>
        <Button
          component={AppRouterLinkComponent}
          size='large'
          color='primary'
          variant='contained'
          to={paths.create}
        >
          Add
        </Button>
      </Grid>
      <Grid item>
        <MyDSOsTable />
      </Grid>
    </Grid>
  )
}
