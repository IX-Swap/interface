import React from 'react'
import { Grid } from '@material-ui/core'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useCreateCorporateIdentity } from 'v2/hooks/identity/useCreateCorporateIdentity'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'

export const CorporateIdCreate: React.FC = () => {
  const { routes } = useIdentitiesRouter()
  const [createCorporateId] = useCreateCorporateIdentity()

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
          cancelButton={<CancelButton link={routes.list} />}
        />
      </Grid>
    </Grid>
  )
}
