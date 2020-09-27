//
import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'

const useStyles = makeStyles(() => ({
  label: {
    color: grey[500],
    fontSize: '.95em',
    paddingTop: '1.25em'
  },
  key: {
    color: grey[700],
    paddingTop: '2.5em'
  }
}))
export const Step3Backup = () => {
  const classes = useStyles()
  const store = useSetup2faStore()

  return useObserver(() => (
    <Container>
      <Typography align='center'>
        Please save this key on paper. This key will allow you to recover your
        Google Authenticator in case of phone loss.
      </Typography>

      <Typography variant='h4' align='center' className={classes.key}>
        {store.key}
      </Typography>

      <Typography align='center' className={classes.label}>
        Resetting your Google Authenticator requires opening a support ticket
        <br />
        and takes at least 7 days to process.
      </Typography>
    </Container>
  ))
}
