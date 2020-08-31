import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { WithdrawForm } from 'v2/app/accounts/banks/WithdrawCash/WithdrawForm'
import { useDepositStore } from 'v2/app/accounts/banks/context'
import { Setup } from 'v2/app/accounts/banks/WithdrawCash/Setup'
import { Preview } from 'v2/app/accounts/banks/WithdrawCash/Preview'
import { observer } from 'mobx-react'
import { ContinueButton } from 'v2/app/accounts/banks/WithdrawCash/ContinueButton'
import { OTP } from 'v2/app/accounts/banks/components/OTP'
import { BankPreview } from 'v2/app/accounts/banks/WithdrawCash/BankPreview'
import { WithdrawCashAlert } from 'v2/app/accounts/banks/components/WithdrawCashAlert'
import { CancelButton } from '../components/CancelButton'
import { SubmitButton } from 'v2/components/form/SubmitButton'

export const WithdrawView: React.FC = observer(() => {
  const { isPreview } = useDepositStore()

  return (
    <WithdrawForm>
      <Grid item>{isPreview ? <Preview /> : <Setup />}</Grid>
      <Grid item>
        <BankPreview />
      </Grid>
      {isPreview && (
        <Grid item>
          <WithdrawCashAlert />
          <OTP />
        </Grid>
      )}
      <Grid item>
        <Grid container justify='center'>
          {isPreview ? (
            <>
              <CancelButton />
              <Box mx={1} />
              <SubmitButton>Confirm Withdrawal</SubmitButton>
            </>
          ) : (
            <ContinueButton />
          )}
        </Grid>
      </Grid>
    </WithdrawForm>
  )
})
