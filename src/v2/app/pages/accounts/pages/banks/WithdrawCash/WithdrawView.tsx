import React from 'react'
import { Box, Grid } from '@material-ui/core'
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
import { CancelButton } from 'v2/app/pages/accounts/pages/banks/components/CancelButton'

export const WithdrawView: React.FC = observer(() => {
  const { isPreview } = useDepositStore()
  const { TextField, Submit } = useWithdrawCashForm()

  return (
    <WithdrawForm>
      <Grid item>{isPreview ? <Preview /> : <Setup />}</Grid>
      <Grid item>
        <BankPreview />
      </Grid>
      {isPreview && (
        <Grid item>
          <WithdrawCashAlert />
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
              <Submit>Confirm Withdrawal</Submit>
            </>
          ) : (
            <ContinueButton />
          )}
        </Grid>
      </Grid>
    </WithdrawForm>
  )
})
