import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { VSpacer } from 'v2/components/VSpacer'

export const IndividualIdCreate: React.FC = () => {
  const { paths } = useIdentitiesRouter()

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={undefined}
          isNew={true}
          submitButtonText='Create'
          cancelButton={<CancelButton link={paths.individual} />}
        />
      </Grid>
    </Grid>
  )
}
