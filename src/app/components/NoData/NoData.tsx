import React from 'react'
import Grid, { GridProps } from '@mui/material/Grid'
import { Typography } from '@mui/material'

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
