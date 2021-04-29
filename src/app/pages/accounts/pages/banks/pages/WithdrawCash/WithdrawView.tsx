import React from 'react'
import { Grid } from '@material-ui/core'
import { WithdrawForm } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/WithdrawForm'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { Setup } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Setup'
import { Preview } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/Preview'
import { observer } from 'mobx-react'
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/WithdrawCash/ContinueButton'
import { WithdrawCashAlert } from 'app/pages/accounts/pages/banks/components/WithdrawCashAlert'
import { BackButton } from 'app/pages/accounts/pages/banks/components/BackButton'
import { DisplayNone } from 'app/components/DisplayNone'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'
import { AlertAndOTP } from 'app/pages/accounts/pages/banks/components/AlertAndOTP'
import { Submit } from 'components/form/Submit'
import { VSpacer } from 'components/VSpacer'

export const WithdrawView: React.FC = observer(() => {
  const { isSetup, isPreview, isSuccess, clear } = useDepositStore()

  useUnmountCallback(clear)

  return (
    <WithdrawForm>
      <Grid
        container
        direction='column'
        spacing={2}
        style={{ display: 'table' }}
      >
        <Grid item xs={12}>
          {(isSetup || isPreview) && (
            <DisplayNone when={isPreview}>
              <Setup />
            </DisplayNone>
          )}
          {isPreview && <Preview />}
          {isSuccess && <SuccessView title='Withdrawal Successful' />}
        </Grid>

        {isPreview && (
          <Grid item>
            <AlertAndOTP alert={WithdrawCashAlert} />
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={5}>
          <VSpacer size='small' />
          <Grid container direction='column' spacing={2}>
            {isPreview && (
              <Grid item>
                <Submit>Confirm Withdrawal</Submit>
              </Grid>
            )}
            {isPreview && (
              <Grid item>
                <BackButton />
              </Grid>
            )}
            {isSetup && (
              <Grid item>
                <ContinueButton />
              </Grid>
            )}
            {isSuccess && (
              <Grid item>
                <ResetButton>Make Another Withdrawal</ResetButton>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </WithdrawForm>
  )
})
