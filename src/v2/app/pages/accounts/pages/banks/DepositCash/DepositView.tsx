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
import { CancelButton } from 'v2/app/pages/accounts/pages/banks/components/CancelButton'
import { ContinueButton } from 'v2/app/pages/accounts/pages/banks/DepositCash/ContinueButton'
import { DepositCashAlert } from 'v2/app/pages/accounts/pages/banks/components/DepositCashAlert'

export const DepositView: React.FC = observer(() => {
  const { TextField, Submit } = useDepositCashForm()
  const { isPreview } = useDepositStore()
  const depositCode = generateRandom(8, 'A#')

  return (
    <DepositForm depositCode={depositCode}>
      <Grid container direction='column' spacing={4}>
        <Grid item>
          {isPreview ? <Preview depositCode={depositCode} /> : <Setup />}
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
                <CancelButton />
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
