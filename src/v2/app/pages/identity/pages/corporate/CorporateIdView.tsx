import React from 'react'
import { PageTitle } from 'v2/app/components/PageTitle'
import { Grid } from '@material-ui/core'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'

export const CorporateIdView: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    routes,
    params: { identityId }
  } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={identity.companyLegalName} />
        <EditButton link={routes.editCorporate} params={{ identityId }} />
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
