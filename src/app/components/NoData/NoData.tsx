import React from 'react'
import Grid, { GridProps } from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'

export interface NoDataProps {
  title?: string
}

export const NoData = (props: NoDataProps & GridProps) => {
  const { title = 'Nothing here...', ...rest } = props

  return (
    <Grid
      {...rest}
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
    </Grid>
  )
}
