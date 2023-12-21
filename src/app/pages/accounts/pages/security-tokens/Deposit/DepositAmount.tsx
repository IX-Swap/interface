import React from 'react'
import { useFormContext } from 'react-hook-form'
import { SUPPORTED_WALLETS } from 'config/blockchain/supportedWallets'
import { AmountField } from '../AmountField'

export const DEPOSIT_METHODS = [...Object.values(SUPPORTED_WALLETS)]

interface DepositAmountProps {
  tokenBalance: string
}

export const DepositAmount = ({ tokenBalance }: DepositAmountProps) => {
  const { watch } = useFormContext()
  const token = watch('token')
  const tokenLogo = token?.logo
  const tokenSymbol = token?.symbol

  console.log('tokenBalance', tokenBalance)
  console.log('Number', Number(tokenBalance))

  return (
    <AmountField
      label='Deposit Amount'
      tokenLogo={tokenLogo}
      tokenSymbol={tokenSymbol}
      tokenBalance={tokenBalance}
    />
  )
}
