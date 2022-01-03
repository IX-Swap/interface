import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './DSONameAndStucture.styles'

export interface DSONameAndStructureProps {
  tokenName: string
  dso: DigitalSecurityOffering
  size?: number
}

export const DSONameAndStructure: React.FC<DSONameAndStructureProps> = ({
  tokenName,
  dso,
  size = 70
}: DSONameAndStructureProps) => {
  const classes = useStyles()

  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
      wrap='nowrap'
      spacing={3}
    >
      <Grid item>
        <DSOLogo dsoId={dso._id} size={size} variant='rounded' />
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
