import useStyles from '../../styles'
import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

const ConfirmationStep = () => {
  const classes = useStyles()
  const history = useHistory()

  const backToLogin = () => {
    history.replace('/auth/login')
  }

  return (
    <>
      <Typography>Your password has been successfully reset</Typography>
      <Button
        color='primary'
        size='large'
        className={classes.forgetButton}
        onClick={backToLogin}
      >
        Back to Login
      </Button>
    </>
  )
}

export default ConfirmationStep
