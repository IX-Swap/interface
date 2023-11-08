import React from 'react'
import { useFormContext } from 'react-hook-form'
// import { AmountField } from 'app/pages/accounts/pages/security-tokens/Withdraw/AmountField'
import { AmountField } from '../AmountField'

export const WithdrawalAmount = () => {
  const { watch } = useFormContext()
  const token = watch('token')
  const tokenLogo = token?.asset?.logo
  const tokenSymbol = token?.asset?.symbol
  const tokenBalance = token?.available

  return (
    <AmountField
      label='Withdrawal Amount'
      tokenLogo={tokenLogo}
      tokenSymbol={tokenSymbol}
      tokenBalance={tokenBalance}
    />
  )
}
