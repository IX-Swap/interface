import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'v2/app/pages/identity/components/CancelButton'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { VSpacer } from 'v2/components/VSpacer'

export const IndividualIdEdit: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={data}
          isEditing={true}
          useOwnEmail={false}
          submitButtonText='Save'
          cancelButton={<CancelButton link={paths.individual} />}
        />
      </Grid>
    </Grid>
  )
}
