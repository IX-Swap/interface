import React from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

export interface SettingsRowProps {
  name?: string
  image: string
  buttonDisabled: boolean
  buttonMessage: string
  buttonClick: () => void
}

const useStyles = makeStyles(() => ({
  button: {
    fontWeight: 'bold',
    width: '100px'
  },
  logoImg: {
    height: '2.5em',
    marginRight: '1em'
  },
  btnImg: {
    height: '3rem',
    marginRight: '1.5em'
  },
  btnLabel: {
    fontSize: '0.95rem'
  },
  popupBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

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
