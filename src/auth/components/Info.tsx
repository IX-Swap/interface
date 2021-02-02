import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import { green } from '@material-ui/core/colors'

export interface InfoProps {
  title: string
  info: string[]
}

export const Info = ({ title, info }: InfoProps) => {
  return (
    <Grid container direction='column' spacing={1}>
      <Grid item>
        <Typography variant='subtitle1' style={{ fontWeight: 500 }}>
          {title}
        </Typography>
      </Grid>
      {info.map((value, i) => (
        <Grid item key={i}>
          <Grid container spacing={1}>
            <Grid item>
              <CheckIcon style={{ color: green[500] }} />
            </Grid>
            <Grid item>
              <Typography variant='body1'>{value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
