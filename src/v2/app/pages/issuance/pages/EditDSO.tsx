import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'v2/components/VSpacer'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { DSO } from 'v2/app/pages/issuance/components/DSO'

export const EditDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  return (
    <Grid container>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <DSO dsoId={dsoId} isEditing />
      </Grid>
    </Grid>
  )
}
