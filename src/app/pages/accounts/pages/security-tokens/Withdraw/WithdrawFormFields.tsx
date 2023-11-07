import React, { useState } from 'react'
import { Grid, Box, Divider, Button } from '@mui/material'
import { WithdrawSecurityTokenField as SecurityToken } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawSecurityTokenField'
import { WithdrawalAmount } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawalAmount'
import { WithdrawTo } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawTo'
import { ConfirmButton } from 'app/pages/accounts/pages/security-tokens/Withdraw/ConfirmButton'
import { useFormContext } from 'react-hook-form'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { ClearFormDialog } from '../ClearFormDialog'
import { isEmpty } from 'lodash'

export interface WithdrawFormFieldsProps {
  //   isLoading: boolean
  isSuccess: boolean
}

export const WithdrawFormFields = ({
  //   isLoading,
  isSuccess
}: WithdrawFormFieldsProps) => {
  const [clearFormConfirmationVisible, setClearFormConfirmationVisible] =
    useState(false)
  const [withdrawConfirmationVisible, setWithdrawConfirmationVisible] =
    useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { watch, reset } = useFormContext()
  const token = watch('token')
  const hasSelectedToken = !isEmpty(token)
  const otp = watch('otp')
  const { isMobile } = useAppBreakpoints()

  const hasError = true

  const clearForm = () => {
    reset()
  }

  return (
    <>
      {isLoading && <LoadingIndicator />}
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <SecurityToken />
        {hasSelectedToken && (
          <>
            <Grid item xs={12}>
              <WithdrawTo />
            </Grid>
            <Grid item xs={12}>
              <WithdrawalAmount />
            </Grid>
            <Grid marginLeft={isMobile ? '50px' : '230px'} item xs={12}>
              <OTPInputField disabled={false} />
            </Grid>
            <Grid item xs={12}>
              <ConfirmButton
                disabled={isLoading || otp === undefined}
                isSuccess={isSuccess}
              />
            </Grid>
          </>
        )}
      </Box>

      <Divider sx={{ marginY: 5 }} />

      <Box display={'flex'} gap={3}>
        <Button
          onClick={() => setClearFormConfirmationVisible(true)}
          variant='outlined'
          color='primary'
          disableElevation
          disabled={!hasSelectedToken}
          sx={{ width: '100%', paddingY: 2 }}
        >
          Clear Form
        </Button>
        <Button
          onClick={() => setWithdrawConfirmationVisible(true)}
          variant='contained'
          color='primary'
          disableElevation
          disabled={hasError}
          sx={{ width: '100%', paddingY: 2 }}
        >
          Confirm
        </Button>
      </Box>

      <ClearFormDialog
        open={clearFormConfirmationVisible}
        close={() => setClearFormConfirmationVisible(false)}
        clearForm={clearForm}
      />

      {/* <ConfirmWithdrawDiaglog
        open={depositConfirmationVisible}
        close={() => setWithdrawConfirmationVisible(false)}
        confirm={sendToken}
        depositMethod={depositMethod}
        walletAddress={walletAddress}
        network={network?.name}
        token={token}
        depositAmount={amount}
      /> */}
    </>
  )
}
