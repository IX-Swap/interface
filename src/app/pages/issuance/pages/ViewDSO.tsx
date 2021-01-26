import React from 'react'
import { Grid } from '@material-ui/core'
import { DSO } from 'app/pages/issuance/components/DSO'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export const ViewDSO = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()

  return (
    <Grid container direction='column'>
      <Grid item>
        <DSO dsoId={dsoId} showAuthorizations />
      </Grid>
    </Grid>
  )
}
