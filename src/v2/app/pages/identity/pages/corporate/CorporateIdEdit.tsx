import React from 'react'
import { Grid } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useUpdateCorporateIdentity } from 'v2/hooks/identity/useUpdateCorporateIdentity'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'

export const CorporateIdEdit: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    routes,
    params: { identityId }
  } = useIdentitiesRouter()
  const [updateCorporateId] = useUpdateCorporateIdentity(identityId)

  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={identity.companyLegalName} />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          data={identity}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Save'
          onSubmit={updateCorporateId}
          cancelButton={
            <CancelButton
              link={routes.corporate}
              params={{ identityId }}
              replace
            />
          }
        />
      </Grid>
    </Grid>
  )
}
