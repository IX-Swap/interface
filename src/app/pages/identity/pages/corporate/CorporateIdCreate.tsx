import React from 'react'
import { Grid } from '@material-ui/core'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { CorporateIdentityForm } from 'app/pages/identity/components/CorporateIdentityForm'
import { useCreateCorporateIdentity } from 'hooks/identity/useCreateCorporateIdentity'
import { CancelButton } from 'app/pages/identity/components/CancelButton'
import { VSpacer } from 'components/VSpacer'

export const CorporateIdCreate: React.FC = () => {
  const { paths } = useIdentitiesRouter()
  const [createCorporateId] = useCreateCorporateIdentity()

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          data={undefined}
          submitButtonText='Create'
          onSubmit={createCorporateId}
          cancelButton={<CancelButton link={paths.list} />}
        />
      </Grid>
    </Grid>
  )
}
