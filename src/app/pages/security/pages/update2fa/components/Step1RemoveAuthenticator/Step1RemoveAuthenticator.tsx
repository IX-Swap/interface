import React from 'react'
import { Typography, Grid } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { useRemove2fa } from 'app/pages/security/pages/update2fa/hooks/useRemove2fa'
import { RemoveAuthenticatorForm } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm'
import { VerificationInfo } from 'app/pages/security/pages/update2fa/components/VerificationInfo/VerificationInfo'
import useStyles from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator/Step1RemoveAuthenticator.styles'

export interface RemoveCurrentAuthenticatorProps {
  onSuccessRemoveAuthenticator: (twoFaData: TwoFaData) => void
}

export const Step1RemoveAuthenticator = ({
  onSuccessRemoveAuthenticator
}: RemoveCurrentAuthenticatorProps) => {
  const classes = useStyles()
  const [update2fa, { isLoading: isRemove2FALoading }] = useRemove2fa(
    onSuccessRemoveAuthenticator
  )

  return (
    <StepWrapper
      title={
        <>
          Update Authenticator by <br /> Verifying Your Identity
        </>
      }
    >
      <Grid container direction={'column'} alignItems={'center'}>
        <Grid item>
          <Typography
            align='center'
            variant='body1'
            className={classes.description}
          >
            To update your Authenticator please remove the current one
          </Typography>
        </Grid>
        <Grid item className={classes.info}>
          <VerificationInfo />
        </Grid>
        <Grid item className={classes.formBlock}>
          <RemoveAuthenticatorForm
            isRemove2FALoading={isRemove2FALoading}
            onSubmit={update2fa}
          />
        </Grid>
      </Grid>
    </StepWrapper>
  )
}
