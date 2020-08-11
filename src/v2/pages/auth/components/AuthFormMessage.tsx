import React from 'react'
import { Typography, Fade } from '@material-ui/core'
import { observer } from 'mobx-react'

import { useUserStore } from '../../../context/user'
import useStyles from '../styles'

const AuthFormMessage = () => {
  const classes = useStyles()
  const { error, message } = useUserStore()

  return (
    <>
      <Fade in={error !== ''}>
        <Typography color='secondary' className={classes.errorMessage}>
          {error}
        </Typography>
      </Fade>
      <Fade in={message !== ''}>
        <Typography color='secondary' className={classes.errorMessage}>
          {message}
        </Typography>
      </Fade>
    </>
  )
}

export default observer(AuthFormMessage)
