import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { DSO } from 'app/pages/issuance/components/DSO'

export const EditDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <DSO dsoId={dsoId} isEditing />
      </Grid>
    </Grid>
  )
}
