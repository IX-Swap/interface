import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useCreateCorporateIdentity } from 'v2/hooks/identity/useCreateCorporateIdentity'

export const CorporateIdCreate: React.FC = () => {
  const { routes } = useIdentitiesRouter()
  const [createCorporateId] = useCreateCorporateIdentity()

  const cancelButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.list} replace>
        Cancel
      </AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title='Create Corporate Identity' />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          identity={undefined}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Create'
          onSubmit={createCorporateId}
          cancelButton={cancelButton}
        />
      </Grid>
    </Grid>
  )
}
