import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import useStyles from './SettingsRow.styles'

export interface SettingsRowProps {
  name: string
  action: JSX.Element
}

export const SettingsRow = ({ name, action }: SettingsRowProps) => {
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
          xs={12}
          sm={8}
        >
          <Grid item>
            <Typography variant='subtitle1'>{name}</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent='flex-end' xs={12} sm={4}>
          {action}
        </Grid>
      </Grid>
    </Box>
  )
}
