import React from 'react'
import { Grid, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { green } from '@mui/material/colors'

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
