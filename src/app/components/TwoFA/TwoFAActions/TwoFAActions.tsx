import React from 'react'
import { Button, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useStyles } from './TwoFAActions.styles'
import { useAuth } from 'hooks/auth/useAuth'
import { useDisable2fa } from 'app/pages/security/hooks/useDisable2fa'

interface ButtonsBlockProps {
  handleClose: () => void
}

export const TwoFAActions = ({ handleClose }: ButtonsBlockProps) => {
  const { user = { enable2Fa: undefined } } = useAuth()
  const [disable2fa] = useDisable2fa(handleClose)
  const { push } = useHistory()
  const { enable2Fa } = user
  const classes = useStyles()

  const handleFirstButtonClick = () => {
    push(SecurityRoute.setup2fa)
    handleClose()
  }

  const handleSecondButtonClick = async () => {
    if (enable2Fa === true) {
      push(SecurityRoute.change2fa)
      handleClose()
    }
    if (enable2Fa === undefined) {
      await disable2fa()
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
