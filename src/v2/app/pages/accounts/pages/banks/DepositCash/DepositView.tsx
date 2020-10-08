import React from 'react'
import { INVESTAX_BANK } from 'v2/config'
import { Box, Grid } from '@material-ui/core'
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

export const DepositView: React.FC = observer(() => {
  const { TextField, Submit } = useDepositCashForm()
  const { isPreview, clear } = useDepositStore()
  const depositCode = generateRandom(8, 'A#')

  useUnmountCallback(clear)

  return (
    <DepositForm depositCode={depositCode}>
      <Grid container direction='column' spacing={4}>
        <Grid item>
          <DisplayNone when={isPreview}>
            <Setup />
          </DisplayNone>
          {isPreview && <Preview depositCode={depositCode} />}
        </Grid>
        <Grid item>
          <BankDetails bank={INVESTAX_BANK} code={depositCode} />
        </Grid>
        {isPreview && (
          <Grid item container justify='center'>
            <DepositCashAlert />
            <Grid item container direction='column'>
              <Box my={4} alignSelf='center'>
                <TextField
                  name='otp'
                  label='2-Factor Auth Code'
                  inputProps={{
                    autoComplete: 'off'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        )}
        <Grid item>
          <Grid container justify='center'>
            {isPreview ? (
              <>
                <BackButton />
                <Box mx={1} />
                <Submit>Confirm Deposit</Submit>
              </>
            ) : (
              <ContinueButton />
            )}
          </Grid>
        </Grid>
      </Grid>
    </DepositForm>
  )
})
