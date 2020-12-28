import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './DSONameAndStucture.styles'

export interface DSONameAndStructureProps {
  tokenName: string
  dso: DigitalSecurityOffering
}

export const DSONameAndStructure: React.FC<DSONameAndStructureProps> = ({
  tokenName,
  dso
}: DSONameAndStructureProps) => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify='flex-start'
      alignItems='center'
      wrap='nowrap'
      spacing={3}
    >
      <Grid item>
        <DSOLogo dsoId={dso._id} size={70} variant='rounded' />
      </Grid>
      <Grid item container direction='column'>
        <Typography>{tokenName}</Typography>
        <Typography className={classes.capital}>
          {dso?.capitalStructure}
        </Typography>
      </Grid>
    </Grid>
  )
}
