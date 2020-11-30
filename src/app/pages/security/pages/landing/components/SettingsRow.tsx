import React from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import useStyles from './SettingsRow.styles'

export interface SettingsRowProps {
  name?: string
  image: string
  buttonDisabled: boolean
  buttonMessage: string
  buttonClick: () => void
}

export const SettingsRow = ({
  name = 'row-image',
  buttonDisabled,
  buttonMessage,
  buttonClick,
  image
}: SettingsRowProps) => {
  const classes = useStyles()

  return (
    <Box mt={5} mb={3}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid container item alignItems='center' justify='flex-start' xs={8}>
          <Grid item>
            <img src={image} className={classes.logoImg} alt={name} />
          </Grid>
          <Grid item>
            <b>{name}</b>
          </Grid>
        </Grid>
        <Grid item container justify='flex-end' xs={4}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            disabled={buttonDisabled}
            onClick={buttonClick}
          >
            {buttonMessage}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
