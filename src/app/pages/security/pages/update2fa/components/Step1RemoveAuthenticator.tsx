import React, { useEffect, useState } from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { StepWrapper } from 'app/pages/security/components/StepWrapper'
import { useGetEmailCode } from 'app/pages/security/pages/update2fa/hooks/useGetEmailCode'
import { RemoveAuthenticatorForm } from 'app/pages/security/pages/update2fa/components/RemoveAuthenticatorForm'
import { useUpdate2fa } from 'app/pages/security/pages/update2fa/hooks/useUpdate2fa'
import { TwoFaData } from 'app/pages/security/types'
import { ResendCode } from 'app/pages/security/pages/update2fa/components/ResendCode/ResendCode'

export type ScreenState = 'Send code' | 'Remove and continue'

export interface RemoveCurrentAuthenticatorProps {
  onSuccessRemoveAuthenticator: (twoFaData: TwoFaData) => void
}

export const Step1RemoveAuthenticator = ({
  onSuccessRemoveAuthenticator
}: RemoveCurrentAuthenticatorProps) => {
  const [screenState, setScreenState] = useState<ScreenState>('Send code')
  const { refetch, data, isLoading: isGetEmailLoading } = useGetEmailCode()
  const [update2fa, { isLoading: isUpdate2faLoading }] = useUpdate2fa(
    onSuccessRemoveAuthenticator
  )

  useEffect(() => {
    if (data !== undefined) {
      setScreenState('Remove and continue')
    }
  }, [data])

  const renderSendCodeScreen = () => (
    <Grid container direction='column' spacing={3} alignItems='center'>
      <Grid item xs={12} md={8} lg={7}>
        <Typography align='center' variant='body1'>
          To remove the Authenticator, we have to send a code to your email. The
          code will be valid for 30 minutes.
        </Typography>
      </Grid>
      <Grid item xs={12} md={8} lg={7}>
        <Button
          variant={'contained'}
          color={'primary'}
          disabled={isGetEmailLoading}
          onClick={async () => await refetch()}
        >
          Send code
        </Button>
      </Grid>
    </Grid>
  )

  const renderRemoveAndContinueScreen = () => {
    return (
      <Grid container direction={'column'} spacing={6}>
        <Grid item>
          <ResendCode action={refetch} data={data} />
        </Grid>
        <Grid item>
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
    <StepWrapper title='Remove Authenticator by Verifying your Identity'>
      {screenState === 'Send code'
        ? renderSendCodeScreen()
        : renderRemoveAndContinueScreen()}
    </StepWrapper>
  )
}
