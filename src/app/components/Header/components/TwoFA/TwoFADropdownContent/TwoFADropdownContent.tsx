import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { TwoFADescription } from 'app/components/TwoFA/TwoFADescription/TwoFADescription'
import { TwoFAActions } from 'app/components/TwoFA/TwoFAActions/TwoFAActions'
import { TwoFAIcon } from 'app/components/TwoFA/TwoFAIcon'
import { useStyles } from './TwoFADropdownContent.styles'
import { useDisable2fa } from 'app/pages/security/hooks/useDisable2fa'
import { useAuth } from 'hooks/auth/useAuth'

export const TwoFADropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { injectedProps } = props
  const { close } = injectedProps
  const handleClose = () => close()
  const [disable2fa] = useDisable2fa(handleClose)
  const { user = { enable2Fa: undefined } } = useAuth()
  const { enable2Fa } = user

  // @ts-expect-error
  useEffect(() => {
    if (enable2Fa === undefined) {
      return async () => await disable2fa()
    }
  }, []) // eslint-disable-line

  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item className={classes.iconBlock}>
        <TwoFAIcon />
      </Grid>
      <Grid item>
        <TwoFADescription />
      </Grid>
      <Grid item>
        <TwoFAActions handleClose={handleClose} />
      </Grid>
    </Grid>
  )
}
