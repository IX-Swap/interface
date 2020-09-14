import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const IndividualIdEdit: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { routes } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  const cancelButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.individual}>Cancel</AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={`${data.firstName} ${data.lastName}`} />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          identity={data}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Save'
          cancelButton={cancelButton}
        />
      </Grid>
    </Grid>
  )
}
