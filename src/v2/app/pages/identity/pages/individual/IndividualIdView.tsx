import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { PageTitle } from 'v2/app/components/PageTitle'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'

export const IndividualIdView: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { routes } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item justify='space-between' alignItems='center'>
        <PageTitle subPage title={`${data.firstName} ${data.lastName}`} />
        <EditButton link={routes.editIndividual} />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={data}
          isEditing={false}
          useOwnEmail={false}
          cancelButton={<CancelButton link={routes.individual} replace />}
        />
      </Grid>
    </Grid>
  )
}
