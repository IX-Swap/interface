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

export const WithdrawView: React.FC = observer(() => {
  const { isPreview, clear } = useDepositStore()
  const { TextField, Submit } = useWithdrawCashForm()

  useUnmountCallback(clear)

  return (
    <Grid container justify='center'>
      <Grid item xs={5}>
        <WithdrawForm>
          <Grid item>
            <DisplayNone when={isPreview}>
              <Setup />
            </DisplayNone>
            {isPreview && <Preview />}
          </Grid>
          <Grid item>
            <BankPreview />
          </Grid>
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
              </Grid>
              <VSpacer size='small' />
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
              {!isPreview && (
                <Grid item>
                  <VSpacer size='small' />
                  <ContinueButton fullWidth />
                </Grid>
              )}
            </Grid>
          </Grid>
        </WithdrawForm>
      </Grid>
    </Grid>
  )
})
