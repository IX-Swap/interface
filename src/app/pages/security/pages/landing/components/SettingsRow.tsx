import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import useStyles from './SettingsRow.styles'

export interface SettingsRowProps {
  name: string
  action: JSX.Element
  actionPosition?: string
}

export const SettingsRow = ({
  name,
  action,
  actionPosition = 'flex-end'
}: SettingsRowProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Grid
        container
        alignItems='center'
        justifyContent='space-between'
        className={classes.content}
      >
        <Grid
          container
          item
          alignItems='center'
          justifyContent='flex-start'
          xs={6}
          sm={6}
        >
          <Grid item>
            <Typography variant='subtitle1'>{name}</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent={actionPosition} xs={6} sm={4}>
          {action}
        </Grid>
      </Grid>
    </Box>
  )
}
