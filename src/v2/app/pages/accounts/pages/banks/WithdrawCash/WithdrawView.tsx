import React from 'react'
import { Grid } from '@material-ui/core'
import {
  useWithdrawCashForm,
  WithdrawForm
} from 'v2/app/pages/accounts/pages/banks/WithdrawCash/WithdrawForm'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { Setup } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Setup'
import { Preview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/Preview'
import { observer } from 'mobx-react'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/ContinueButton'
import { BankPreview } from 'v2/app/pages/accounts/pages/banks/WithdrawCash/BankPreview'
import { WithdrawCashAlert } from 'v2/app/pages/accounts/pages/banks/components/WithdrawCashAlert'
import { BackButton } from 'v2/app/pages/accounts/pages/banks/components/BackButton'
import { DisplayNone } from 'v2/app/components/DisplayNone'
import { useUnmountCallback } from 'v2/hooks/useUnmountCallback'
import { VSpacer } from 'v2/components/VSpacer'
import { SuccessView } from 'v2/app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'v2/app/pages/accounts/pages/banks/components/ResetButton'

export const WithdrawView: React.FC = observer(() => {
  const { isSetup, isPreview, isSuccess, clear } = useDepositStore()
  const { TextField, Submit } = useWithdrawCashForm()

  useUnmountCallback(clear)

  return (
    <WithdrawForm>
      <Grid container justify='center'>
        <Grid item xs={5} container direction='column' spacing={4}>
          <Grid item>
            {(isSetup || isPreview) && (
              <DisplayNone when={isPreview}>
                <Setup />
              </DisplayNone>
            )}
            {isPreview && <Preview />}
            {isSuccess && <SuccessView title='Withdrawal Successful' />}
          </Grid>
          {(isSetup || isPreview) && <BankPreview />}
          {isPreview && (
            <Grid item>
              <WithdrawCashAlert />
              <Grid item container direction='column'>
                <TextField
                  name='otp'
                  label='2-Factor Auth Code'
                  inputProps={{
                    autoComplete: 'off'
                  }}
                />
                <VSpacer size='small' />
              </Grid>
            </Grid>
          )}
          <Grid item>
            <Grid container direction='column' spacing={1}>
              {isPreview && (
                <Grid item>
                  <Submit fullWidth>Confirm Withdrawal</Submit>
                </Grid>
              )}
              {isPreview && (
                <Grid item>
                  <BackButton fullWidth />
                </Grid>
              )}
              {isSetup && (
                <Grid item>
                  <ContinueButton fullWidth />
                </Grid>
              )}
              {isSuccess && (
                <Grid item>
                  <ResetButton fullWidth>Make Another Withdrawal</ResetButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WithdrawForm>
  )
})
