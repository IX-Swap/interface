import useStyles from 'v2/Auth/styles'
import { Button, Typography } from '@material-ui/core'
import React from 'react'
import { useAuthRouter } from 'v2/Auth/router'

const ConfirmationStep: React.FC = () => {
  const classes = useStyles()
  const { push } = useAuthRouter()

  const backToLogin = (): void => {
    push('login')
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
