import React from 'react'
import { TransactionBase } from 'app/pages/accounts/types'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'hooks/asset/useAssetsData'
import { formatMoney } from 'helpers/numbers'
import { Grid } from '@mui/material'

export interface CashTransactionAlertProps {
  assetId: string
  children: (money: string) => JSX.Element
}

export const CashTransactionAlert: React.FC<
  CashTransactionAlertProps
> = props => {
  const { assetId, children } = props
  const { watch } = useFormContext<TransactionBase>()
  const { data, isLoading } = useAssetsData('Currency')
  const amount = watch('amount')
  const asset = data.map[assetId]

  if (isLoading) {
    return null
  }

  const money = formatMoney(amount, asset.numberFormat.currency)

  return (
    <Grid data-testid='CashTransactionAlert' item container direction='column'>
      {children(money)}
    </Grid>
  )
}
