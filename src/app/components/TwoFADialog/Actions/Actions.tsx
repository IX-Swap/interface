import React from 'react'
import { Button, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { useStyles } from 'app/components/TwoFADialog/Actions/Actions.styles'
import { useDisable2fa } from 'app/pages/security/hooks/useDisable2fa'

export interface ActionsProps {
  enable2fa: boolean | undefined
  handleClose: () => void
}

export const Actions = ({ handleClose, enable2fa }: ActionsProps) => {
  const [disable2fa] = useDisable2fa()
  const { push } = useHistory()
  const classes = useStyles()

  const handleFirstButtonClick = () => {
    push(SecurityRoute.setup2fa)
    handleClose()
  }

  const handleSecondButtonClick = async () => {
    if (enable2fa === true) {
      push(SecurityRoute.change2fa)
    }
    if (enable2fa === undefined) {
      await disable2fa()
    }
    handleClose()
  }

  return (
    <Grid item container direction={'column'} className={classes.container}>
      {enable2fa !== true && (
        <Button
          data-testid='first-button'
          variant={'contained'}
          className={classes.firstButton}
          onClick={handleFirstButtonClick}
        >
          Enable 2FA
        </Button>
      )}

      <Button
        data-testid='second-button'
        variant={'outlined'}
        onClick={handleSecondButtonClick}
      >
        {enable2fa === true ? 'Update 2FA' : 'Later'}
      </Button>
    </Grid>
  )
}
