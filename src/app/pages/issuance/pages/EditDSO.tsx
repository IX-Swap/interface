import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useParams } from 'react-router-dom'
import { DSO } from 'app/pages/issuance/components/DSO'

export const EditDSO = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()

  return (
    <Grid container direction='column'>
      <Grid item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <DSO dsoId={dsoId} issuerId={issuerId} isEditing />
      </Grid>
    </Grid>
  )
}
