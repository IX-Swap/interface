import React from 'react'
import { Grid } from '@material-ui/core'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { useCreateCorporateIdentity } from 'v2/hooks/identity/useCreateCorporateIdentity'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { VSpacer } from '../../../../../components/VSpacer'

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
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Create'
          onSubmit={createCorporateId}
          cancelButton={<CancelButton link={paths.list} />}
        />
      </Grid>
    </Grid>
  )
}
