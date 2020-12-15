import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { ReactComponent as SuccessIcon } from 'assets/icons/success.svg'

export interface SuccessViewProps {
  title: string
  message?: string
}

export const SuccessView = (props: SuccessViewProps) => {
  const { title, message } = props

  return (
    <Grid container direction='column' alignItems='center' spacing={1}>
      <Grid item>
        <SuccessIcon width={100} />
      </Grid>
      <Grid item>
        <Typography variant='h5'>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography>{message}</Typography>
      </Grid>
    </Grid>
  )
}
