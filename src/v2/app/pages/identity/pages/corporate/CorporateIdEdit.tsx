import React from 'react'
import { Button, Grid } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { useParams } from 'react-router-dom'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useUpdateCorporateIdentity } from 'v2/hooks/identity/useUpdateCorporateIdentity'

export const CorporateIdEdit: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const { identityId } = useParams<{ identityId: string }>()
  const { routes } = useIdentitiesRouter()
  const [updateCorporateId] = useUpdateCorporateIdentity(identityId)

  if (status === 'loading' || data === undefined) {
    return null
  }

  const identity = data.map[identityId]
  const cancelButton = (
    <Button color='primary'>
      <AppRouterLink to={routes.corporate} params={{ identityId }} replace>
        Cancel
      </AppRouterLink>
    </Button>
  )

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={identity.companyLegalName} />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          identity={identity}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Save'
          onSubmit={updateCorporateId}
          cancelButton={cancelButton}
        />
      </Grid>
    </Grid>
  )
}
