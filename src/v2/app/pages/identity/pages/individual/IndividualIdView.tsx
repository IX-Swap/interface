import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const IndividualIdView: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { routes } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  const editButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.editIndividual}>Edit</AppRouterLink>
    </Button>
  )
  const cancelButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.individual} replace>
        Cancel
      </AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={`${data.firstName} ${data.lastName}`} />
        {editButton}
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          identity={data}
          isEditing={false}
          useOwnEmail={false}
          cancelButton={cancelButton}
        />
      </Grid>
    </Grid>
  )
}
