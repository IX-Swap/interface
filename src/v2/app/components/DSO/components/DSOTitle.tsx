import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Grid, Typography } from '@material-ui/core'
import { DSOLogo } from './DSOLogo'

export interface DsoTitleProps {
  dso: DigitalSecurityOffering
}

export const DSOTitle = (props: DsoTitleProps) => {
  const { dso } = props

  return (
    <Grid container direction='row' alignItems='center' spacing={2}>
      <Grid item>
        <DSOLogo size={60} dsoId={dso._id} />
      </Grid>
      <Grid item>
        <Typography variant='h4'>{dso.tokenSymbol}</Typography>
        <Typography>{dso.issuerName}</Typography>
      </Grid>
    </Grid>
  )
}
