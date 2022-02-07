import React from 'react'
import { INVESTAX_BANK, isDevEnv } from 'config'
import { Grid } from '@mui/material'
import { DepositForm } from 'app/pages/accounts/pages/banks/pages/DepositCash/DepositForm'
import { BankDetails } from 'app/components/BankDetails'
import { observer } from 'mobx-react'
import { generateRandom } from 'helpers/numbers'
import { useDepositStore } from 'app/pages/accounts/pages/banks/context'
import { Preview } from 'app/pages/accounts/pages/banks/pages/DepositCash/Preview'
import { Setup } from 'app/pages/accounts/pages/banks/pages/DepositCash/Setup'
import { BackButton } from 'app/pages/accounts/pages/banks/components/BackButton'
import { ContinueButton } from 'app/pages/accounts/pages/banks/pages/DepositCash/ContinueButton'
import { DisplayNone } from 'app/components/DisplayNone'
import { useUnmountCallback } from 'hooks/useUnmountCallback'
import { SuccessView } from 'app/pages/accounts/pages/banks/components/SuccessView'
import { ResetButton } from 'app/pages/accounts/pages/banks/components/ResetButton'
import { Submit } from 'components/form/Submit'
import { AlertAndOTP } from 'app/pages/accounts/pages/banks/components/AlertAndOTP'
import { DepositCashAlert } from 'app/pages/accounts/pages/banks/components/DepositCashAlert'

export const DepositView: React.FC = observer(() => {
  const { isPreview, isSuccess, isSetup, clear } = useDepositStore()
  const depositCode = generateRandom(8, 'A#')

  useUnmountCallback(clear)

  return (
    <DepositForm depositCode={depositCode}>
      <Grid container justifyContent='center'>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          container
          direction='column'
          spacing={4}
        >
          <Grid item>
            {(isSetup || isPreview) && (
              <DisplayNone when={isPreview}>
                <Setup />
              </DisplayNone>
            )}
            {isPreview && <Preview depositCode={depositCode} />}
            {isSuccess && <SuccessView title='Deposit Successful' />}
          </Grid>
          {isDevEnv && (isSetup || isPreview) && (
            <Grid item>
              <BankDetails bank={INVESTAX_BANK} code={depositCode} />
            </Grid>
          )}
          {isPreview && <AlertAndOTP alert={DepositCashAlert} />}
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
