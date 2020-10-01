import React from 'react'
import { PageTitle } from 'v2/app/components/PageTitle'
import { Button, Grid } from '@material-ui/core'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const CorporateIdView: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    routes,
    params: { identityId }
  } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  const identity = data.map[identityId]

  const editButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.editCorporate} params={{ identityId }}>
        Edit
      </AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={identity.companyLegalName} />
        {editButton}
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          identity={identity}
          isEditing={false}
          useOwnEmail={false}
        />
      </Grid>
    </Grid>
  )
}
