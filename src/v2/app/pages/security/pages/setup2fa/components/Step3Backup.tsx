import React from 'react'
import { Container, Typography } from '@material-ui/core'
import useStyles from './Step3Backup.styles'
import { useSetup2faStore } from '../context'
import { useObserver } from 'mobx-react'

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
