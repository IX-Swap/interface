import { Grid } from '@mui/material'
import { TokensField } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/TokensField'
import { WithdrawalAmount } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawalAmount'
import { WithdrawTo } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/WithdrawTo'
import React from 'react'
import { ConfirmButton } from 'app/pages/accounts/pages/digitalSecurities/Withdraw/ConfirmButton'
import { useFormContext } from 'react-hook-form'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface WithdrawFormFieldsProps {
  isLoading: boolean
  isSuccess: boolean
}

export const WithdrawFormFields = ({
  isLoading,
  isSuccess
}: WithdrawFormFieldsProps) => {
  const { watch } = useFormContext()
  const tokenSymbol = watch('token')
  const otp = watch('otp')
  const hasTokenSymbol = tokenSymbol !== ''
  const { isMobile } = useAppBreakpoints()

  return (
    <>
      <Grid item xs={12}>
        <TokensField />
      </Grid>
      {hasTokenSymbol && (
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
    </>
  )
}
