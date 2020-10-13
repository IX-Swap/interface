import React from 'react'
import { DSOImage } from 'v2/app/components/DSO/components/DSOImage'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Grid, Typography } from '@material-ui/core'

export interface DsoTitleProps {
  dso: DigitalSecurityOffering
  editMode?: boolean
}

export const DSOTitle = (props: DsoTitleProps) => {
  const { editMode = false, dso } = props

  return (
    <Grid container direction='row' spacing={2}>
      <Grid item>
        <DSOImage dsoId={dso._id} editMode={editMode} />
      </Grid>
      <Grid item>
        <Typography variant='h4'>{dso.tokenSymbol}</Typography>
        <Typography>{dso.issuerName}</Typography>
      </Grid>
    </Grid>
  )
}
