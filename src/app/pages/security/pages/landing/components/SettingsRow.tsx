import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import useStyles from './SettingsRow.styles'

export interface SettingsRowProps {
  name: string
  image?: string
  action: JSX.Element
}

export const SettingsRow = ({ name, action, image }: SettingsRowProps) => {
  const classes = useStyles()

  return (
    <Box mt={5} mb={3}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid container item alignItems='center' justify='flex-start' xs={8}>
          {image !== undefined && (
            <Grid item>
              <img src={image} className={classes.logoImg} alt={name} />
            </Grid>
          )}
          <Grid item>
            <Typography variant='subtitle1'>{name}</Typography>
          </Grid>
        </Grid>
        <Grid item container justify='flex-end' xs={4}>
          {action}
        </Grid>
      </Grid>
    </Box>
  )
}
