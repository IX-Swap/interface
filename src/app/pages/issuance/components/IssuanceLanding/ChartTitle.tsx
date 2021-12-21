import React, { ReactElement } from 'react'
import { Grid, Typography } from '@material-ui/core'

export interface ChartTitleProps {
  title: ReactElement | string
  small?: boolean
  icon?: JSX.Element
}

export const ChartTitle = (props: ChartTitleProps) => {
  const { title, small = false, icon } = props
  return (
    <Grid container spacing={1} wrap='nowrap'>
      {icon !== undefined ? <Grid item>{icon}</Grid> : null}
      <Grid item>
        <Typography
          color={small ? 'textSecondary' : 'textPrimary'}
          variant={small ? 'subtitle2' : 'subtitle1'}
          noWrap
          style={{ lineHeight: '25px' }}
        >
          {title}
        </Typography>
      </Grid>
    </Grid>
  )
}
