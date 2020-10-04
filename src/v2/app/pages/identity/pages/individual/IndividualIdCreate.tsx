import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { PageTitle } from 'v2/app/components/PageTitle'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const IndividualIdCreate: React.FC = () => {
  const { routes } = useIdentitiesRouter()

  const cancelButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.individual}>Cancel</AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title='Create Individual Identity' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={undefined}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Create'
          cancelButton={cancelButton}
        />
      </Grid>
    </Grid>
  )
}
