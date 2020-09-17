import React from 'react'
import { TransactionBase } from 'v2/app/pages/accounts/types'
import { useFormContext } from 'react-hook-form'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'
import { formatMoney } from 'v2/helpers/numbers'
import { Grid } from '@material-ui/core'

export interface CashTransactionAlertProps {
  assetId: string
  children: (money: string) => JSX.Element
}

export const CashTransactionAlert: React.FC<CashTransactionAlertProps> = props => {
  const { assetId, children } = props
  const { getValues } = useFormContext<TransactionBase>()
  const { data, status } = useAssetsData('Currency')
  const { amount } = getValues()
  const asset = data.map[assetId]

  if (status === 'loading') {
    return null
  }

  const money = formatMoney(amount, asset.numberFormat.currency)

  return (
    <Grid item container direction='column'>
      {children(money)}
    </Grid>
  )
}
