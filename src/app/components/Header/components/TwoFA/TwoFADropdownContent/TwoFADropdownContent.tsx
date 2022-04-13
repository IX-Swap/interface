import React from 'react'
import { Grid } from '@mui/material'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { TwoFADescription } from 'app/components/TwoFA/TwoFADescription/TwoFADescription'
import { TwoFAActions } from 'app/components/TwoFA/TwoFAActions/TwoFAActions'
import { TwoFAIcon } from 'app/components/TwoFA/TwoFAIcon'
import { useStyles } from './TwoFADropdownContent.styles'

export const TwoFADropdownContent = (props: DropdownContentProps) => {
  const classes = useStyles()
  const { injectedProps } = props
  const { close } = injectedProps
  const handleClose = () => close()

  // TODO Needs to add api call to {{ENDPOINT}}/auth/2fa/disable/{{UserId}} on component unmount

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
