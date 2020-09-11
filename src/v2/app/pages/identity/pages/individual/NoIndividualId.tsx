import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const NoIndividualId: React.FC = () => {
  const { routes } = useIdentitiesRouter()

  return (
    <Grid container justify='center' alignItems='center'>
      <Button color='primary' variant='contained'>
        <AppRouterLink to={routes.createIndividual}>
          Create Identity
        </AppRouterLink>
      </Button>
    </Grid>
  )
}
