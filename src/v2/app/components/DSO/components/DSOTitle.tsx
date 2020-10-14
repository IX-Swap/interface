import React from 'react'
import { DigitalSecurityOffering } from 'v2/types/dso'
import { Grid, Typography } from '@material-ui/core'
import { DSOAvatar } from 'v2/app/components/DSO/components/DSOAvatar'

interface DsoTitleProps {
  dso: DigitalSecurityOffering
}

export const DSOTitle = (props: DsoTitleProps) => {
  const { dso } = props

  return (
    <Grid container direction='row' alignItems='center' spacing={2}>
      <Grid item>
        <DSOAvatar
          imageId={dso.logo}
          dsoOwnerId={dso.user}
          size={60}
          variant='circle'
        />
      </Grid>
      <Grid item>
        <Typography variant='h4'>{dso.tokenSymbol}</Typography>
        <Typography>{dso.issuerName}</Typography>
      </Grid>
    </Grid>
  )
}
