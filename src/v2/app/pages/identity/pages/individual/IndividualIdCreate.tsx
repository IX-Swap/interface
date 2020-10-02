import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const IndividualIdCreate: React.FC = () => {
  const { routes } = useIdentitiesRouter()

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title='Create Individual Identity' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          identity={undefined}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Create'
          cancelButton={<CancelButton link={routes.individual} />}
        />
      </Grid>
    </Grid>
  )
}
