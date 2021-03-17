import React from 'react'
import { Grid } from '@material-ui/core'
import { DSO } from 'app/pages/issuance/components/DSO'
import { useParams } from 'react-router-dom'

export const ViewDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <Grid container direction='column'>
      <Grid item>
        <DSO dsoId={dsoId} issuerId={issuerId} showAuthorizations showSidebar />
      </Grid>
    </Grid>
  )
}
