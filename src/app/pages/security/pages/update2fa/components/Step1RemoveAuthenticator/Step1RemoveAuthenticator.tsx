import React, { useEffect, useState } from 'react'
import { Typography, Grid, Button } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { useRemove2fa } from 'app/pages/security/pages/update2fa/hooks/useRemove2fa'
import remove2FAIcon from 'app/pages/security/pages/update2fa/assets/remove-2fa-icon.png'
import { useGetEmailCode } from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { RemoveAuthenticatorForm } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm'
import { VerificationInfo } from 'app/pages/security/pages/update2fa/components/VerificationInfo/VerificationInfo'
import useStyles from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator/Step1RemoveAuthenticator.styles'

export enum ScreenState {
  FirstScreen = 'Send code',
  SecondScreen = 'Remove and continue'
}

export interface RemoveCurrentAuthenticatorProps {
  onSuccessRemoveAuthenticator: (twoFaData: TwoFaData) => void
}

export const Step1RemoveAuthenticator = ({
  onSuccessRemoveAuthenticator
}: RemoveCurrentAuthenticatorProps) => {
  const classes = useStyles()
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.FirstScreen
  )
  const { refetch, data, isLoading: isGetEmailLoading } = useGetEmailCode()
  const [update2fa, { isLoading: isUpdate2faLoading }] = useRemove2fa(
    onSuccessRemoveAuthenticator
  )
  const getEmailCode = async () => {
    await refetch()
  }

  useEffect(() => {
    if (data !== undefined) {
      setScreenState(ScreenState.SecondScreen)
    }
  }, [data])

  const renderSendCodeScreen = () => (
    <Grid container direction='column' alignItems='center'>
      <Grid item container justifyContent={'center'}>
        <Grid item>
          <img src={remove2FAIcon} alt='Remove 2FA' className={classes.icon} />
        </Grid>
      </Grid>
      <Button
        variant={'contained'}
        color={'primary'}
        disabled={isGetEmailLoading}
        onClick={getEmailCode}
        className={classes.button}
      >
        Send code
      </Button>
    </Grid>
  )

  const renderRemoveAndContinueScreen = () => {
    return (
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
            isLoading={isUpdate2faLoading}
            onSubmit={update2fa}
            email={data?.email ?? ''}
          />
        </Grid>
      </Grid>
    )
  }

  return (
    <StepWrapper
      title={
        <>
          Update Authenticator by <br /> Verifying Your Identity
        </>
      }
    >
      {screenState === ScreenState.FirstScreen
        ? renderSendCodeScreen()
        : renderRemoveAndContinueScreen()}
    </StepWrapper>
  )
}
