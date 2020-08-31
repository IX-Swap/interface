import React from 'react'
import { INVESTAX_BANK } from 'v2/config'
import { Box, Grid } from '@material-ui/core'
import { DepositForm } from 'v2/app/accounts/banks/DepositCash/DepositForm'
import BankDetails from 'v2/app/components/bank-details'
import { observer } from 'mobx-react'
import { OTP } from 'v2/app/accounts/banks/components/OTP'
import { generateRandom } from 'v2/helpers/numbers'
import { useDepositStore } from '../context'
import { Preview } from 'v2/app/accounts/banks/DepositCash/Preview'
import { Setup } from 'v2/app/accounts/banks/DepositCash/Setup'
import { CancelButton } from 'v2/app/accounts/banks/components/CancelButton'
import { SubmitButton } from 'v2/components/form/SubmitButton'
import { ContinueButton } from 'v2/app/accounts/banks/DepositCash/ContinueButton'
import { DepositCashAlert } from 'v2/app/accounts/banks/components/DepositCashAlert'

export const DepositView: React.FC = observer(() => {
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
            <OTP />
          </Grid>
        )}
        <Grid item>
          <Grid container justify='center'>
            {isPreview ? (
              <>
                <CancelButton />
                <Box mx={1} />
                <SubmitButton>Confirm Deposit</SubmitButton>
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
