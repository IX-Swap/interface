import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { isEmpty } from 'lodash'
import { Box, Divider, Button } from '@mui/material'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { WithdrawSecurityTokenField as SecurityToken } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawSecurityTokenField'
import { WithdrawTo } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawTo'
import { WithdrawalAmount } from 'app/pages/accounts/pages/security-tokens/Withdraw/WithdrawalAmount'
import { MemoField } from 'app/pages/accounts/pages/security-tokens/Withdraw/MemoField'
// import { Warning } from 'app/pages/accounts/pages/security-tokens/Withdraw/Warning'
// import { ConfirmButton } from 'app/pages/accounts/pages/security-tokens/Withdraw/ConfirmButton'
import { WithdrawalFee } from './WithdrawalFee'
import { OTPInputField } from 'app/pages/accounts/components/OTPDialog/OTPInputField'
import { ClearFormDialog } from '../ClearFormDialog'
import { useWithdrawalFee } from 'app/pages/accounts/hooks/useWithdrawalFee'
import { ConfirmWithdrawalDialog } from './ConfirmWithdrawalDialog'
import { useWithdrawDS } from '../../banks/hooks/useWithdrawDS'
import { TokenType } from '../TokenType/TokenType'

export const WithdrawFormFields = () => {
  const [clearFormConfirmationVisible, setClearFormConfirmationVisible] =
    useState(false)
  const [withdrawalConfirmationVisible, setWithdrawalConfirmationVisible] =
    useState(false)
  const { watch, reset, control, setValue } = useFormContext()
  const tokenType = watch('tokenType')
  const token = watch('token')
  const tokenBalance = token?.available
  const hasSelectedToken = !isEmpty(token)
  const wallet = watch('wallet')
  const hasSelectedWalletAddress = !isEmpty(wallet)
  const amount = watch('amount')
  const fiatBalance = watch('fiatBalance')
  const fee = watch('withdrawalFee')
  const currency = watch('currency')
  const memo = watch('memo')
  const otp = watch('otp')

  const {
    data: withdrawal,
    refetch: refetchWithdrawalFee,
    isLoading: isFetchingWithdrawalFee
    //   } = useWithdrawalFee(token?.asset?.network?._id)
  } = useWithdrawalFee(token?.asset?._id)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setValue('token', ''), [tokenType])

  useEffect(() => {
    setValue('currency', withdrawal?.data?.currency)
    setValue('withdrawalFee', withdrawal?.data?.withdrawalFee)
    setValue('fiatBalance', withdrawal?.data?.balance)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [withdrawal, token])

  useEffect(() => {
    if (!isEmpty(token)) void refetchWithdrawalFee()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const inSufficientTokenBalance = tokenBalance < amount
  //   const inSufficientCurencyBalance = withdrawal?.valid !== true
  const hasError =
    !hasSelectedToken ||
    !hasSelectedWalletAddress ||
    inSufficientTokenBalance ||
    amount === undefined ||
    amount <= 0 ||
    fiatBalance < fee ||
    otp === undefined

  const clearForm = () => {
    reset()
  }

  const [mutate, { isLoading }] = useWithdrawDS()
  const withdrawSTO = async () => {
    const args = {
      asset: token?.asset?._id,
      withdrawalAddress: wallet?._id,
      amount: String(amount),
      memo,
      otp
    }

    await mutate(args, {
      onSuccess: clearForm
    })
  }

  return (
    <>
      {(isLoading || isFetchingWithdrawalFee) && <LoadingIndicator />}
      <Box display={'flex'} flexDirection={'column'} gap={3}>
        <TokenType />

        <SecurityToken />

        {hasSelectedToken && (
          <>
            <WithdrawTo />

            <input {...control.register('fiatBalance')} hidden />
            <input {...control.register('withdrawalFee')} hidden />
            <input {...control.register('currency')} hidden />

            {hasSelectedWalletAddress && (
              <>
                <WithdrawalAmount />

                <WithdrawalFee
                  currency={currency}
                  balance={fiatBalance}
                  fee={fee}
                  inSufficientBalance={fiatBalance < fee}
                />

                <MemoField />
                {/* <Warning /> */}

                <OTPInputField disabled={false} />
                {/* <Grid item xs={12}>
                  <ConfirmButton
                    disabled={isLoading || otp === undefined}
                    isSuccess={isSuccess}
                  />
                </Grid> */}
              </>
            )}
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
          onClick={() => setWithdrawalConfirmationVisible(true)}
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

      <ConfirmWithdrawalDialog
        open={withdrawalConfirmationVisible}
        close={() => setWithdrawalConfirmationVisible(false)}
        confirm={withdrawSTO}
        walletName={wallet?.label}
        walletAddress={wallet?.address}
        token={token?.asset}
        withdrawalAmount={amount}
        currency={currency}
        withdrawalFee={fee}
        memo={memo}
      />
    </>
  )
}
