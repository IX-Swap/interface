import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { Description } from 'app/components/TwoFADialog/Description/Description'
import { Actions } from 'app/components/TwoFADialog/Actions/Actions'
import { InfoIcon } from 'app/components/TwoFADialog/InfoIcon'
import { useStyles } from './TwoFADropdownContent.styles'
import { useDisable2fa } from 'app/pages/security/hooks/useDisable2fa'
import { useAuth } from 'hooks/auth/useAuth'

export const TwoFADropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { injectedProps } = props
  const { close } = injectedProps
  const [disable2fa] = useDisable2fa(close)
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user

  useEffect(() => {
    if (enable2Fa === undefined) {
      return () => {
        void disable2fa()
      }
    }
  }, []) // eslint-disable-line

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item className={classes.iconBlock}>
        <InfoIcon enable2Fa={enable2Fa} />
      </Grid>
      <Grid item>
        <Description enable2Fa={enable2Fa} />
      </Grid>
      <Grid item>
        <Actions enable2fa={enable2Fa} handleClose={close} />
      </Grid>
    </Grid>
  )
}
