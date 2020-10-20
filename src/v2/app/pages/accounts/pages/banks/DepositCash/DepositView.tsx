import React from 'react'
import { INVESTAX_BANK } from 'v2/config'
import { Grid } from '@material-ui/core'
import {
  DepositForm,
  useDepositCashForm
} from 'v2/app/pages/accounts/pages/banks/DepositCash/DepositForm'
import { BankDetails } from 'v2/app/components/BankDetails'
import { observer } from 'mobx-react'
import { generateRandom } from 'v2/helpers/numbers'
import { useDepositStore } from 'v2/app/pages/accounts/pages/banks/context'
import { Preview } from 'v2/app/pages/accounts/pages/banks/DepositCash/Preview'
import { Setup } from 'v2/app/pages/accounts/pages/banks/DepositCash/Setup'
import { BackButton } from 'v2/app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'
import { DisplayNone } from 'v2/app/components/DisplayNone'
import { useUnmountCallback } from 'v2/hooks/useUnmountCallback'
import { VSpacer } from 'v2/components/VSpacer'
import { SuccessView } from 'v2/app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'v2/app/pages/accounts/pages/banks/components/ResetButton'

export const DepositView: React.FC = observer(() => {
  const { TextField, Submit } = useDepositCashForm()
  const { isPreview, isSuccess, isSetup, clear } = useDepositStore()
  const depositCode = generateRandom(8, 'A#')

  useUnmountCallback(clear)

  return (
    <DepositForm depositCode={depositCode}>
      <Grid container justify='center'>
        <Grid item xs={5} container direction='column' spacing={4}>
          <Grid item>
            {(isSetup || isPreview) && (
              <DisplayNone when={isPreview}>
                <Setup />
              </DisplayNone>
            )}
            {isPreview && <Preview depositCode={depositCode} />}
            {isSuccess && <SuccessView title='Deposit Successful' />}
          </Grid>
          {(isSetup || isPreview) && (
            <Grid item>
              <BankDetails bank={INVESTAX_BANK} code={depositCode} />
            </Grid>
          )}
          {isPreview && (
            <Grid item container justify='center'>
              <DepositCashAlert />
              <Grid item container direction='column' xs={12}>
                <VSpacer size='small' />
                <TextField
                  name='otp'
                  label='2-Factor Auth Code'
                  formControlProps={{
                    fullWidth: true
                  }}
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
                  <Submit fullWidth>Confirm Deposit</Submit>
                </Grid>
              )}
              {isPreview && (
                <Grid item>
                  <BackButton fullWidth />
                </Grid>
              )}
              {isSetup && (
                <Grid item>
                  <ContinueButton />
                </Grid>
              )}
              {isSuccess && (
                <Grid item>
                  <ResetButton fullWidth>Make Another Deposit</ResetButton>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </DepositForm>
  )
})
