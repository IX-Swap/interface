import React from 'react'
import { Typography, Fade } from '@material-ui/core'
import { observer } from 'mobx-react'

import { useUserStore } from 'v2/Auth/context'
import useStyles from '../styles'

const FormMessage: React.FC = () => {
  const classes = useStyles()
  const { error, message } = useUserStore()

  return (
    <>
      <Fade in={error !== ''}>
        <Typography
          color='secondary'
          className={classes.errorMessage}
          data-testid='error'
        >
          {error}
        </Typography>
      </Fade>
      <Fade in={message !== ''}>
        <Typography
          color='secondary'
          className={classes.errorMessage}
          data-testid='message'
        >
          {message}
        </Typography>
      </Fade>
    </>
  )
}

export default observer(FormMessage)
