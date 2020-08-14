import React from 'react'
import DsoImage from './image'
import { Dso } from '../../../types/dso'
import { Grid, Typography } from '@material-ui/core'

interface DsoTitleProps {
  dso: Dso
  editMode?: boolean
}

const DsoTitle = ({ editMode = false, dso }: DsoTitleProps) => {
  return (
    <Grid container direction='row' spacing={2}>
      <Grid item>
        <DsoImage dsoId={dso._id} editMode={editMode} />
      </Grid>
      <Grid item>
        <Typography variant='h4'>{dso.tokenSymbol}</Typography>
        <Typography>{dso.issuerName}</Typography>
      </Grid>
    </Grid>
  )
}

export default DsoTitle
