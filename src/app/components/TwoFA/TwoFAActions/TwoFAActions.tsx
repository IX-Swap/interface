import React from 'react'
import { Button, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useStyles } from './TwoFAActions.styles'
import { useAuth } from 'hooks/auth/useAuth'

interface ButtonsBlockProps {
  handleClose: () => void
}

export const TwoFAActions = ({ handleClose }: ButtonsBlockProps) => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const { push } = useHistory()
  const { enable2Fa } = user

  const classes = useStyles()

  const handleFirstButtonClick = () => {
    push(SecurityRoute.setup2fa)
    handleClose()
  }

  const handleSecondButtonClick = () => {
    if (enable2Fa === true) {
      push(SecurityRoute.change2fa)
      handleClose()
    } else {
      // TODO Call to backend api {{ENDPOINT}}/auth/2fa/disable/{{UserId}}
      handleClose()
    }
  }

  return (
    <Grid item container direction={'column'} className={classes.container}>
      {enable2Fa !== true && (
        <Button
          variant={'contained'}
          className={classes.firstButton}
          onClick={handleFirstButtonClick}
        >
          Enabled 2FA
        </Button>
      )}

      <Button variant={'outlined'} onClick={handleSecondButtonClick}>
        {enable2Fa === true ? 'Update 2FA' : 'Later'}
      </Button>
    </Grid>
  )
}
