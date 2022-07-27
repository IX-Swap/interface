import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CommitmentFormValues } from 'types/commitment'
import { formatMoney } from 'helpers/numbers'
import { Grid, Typography } from '@mui/material'
import { useCurrencyBalance } from 'app/pages/invest/hooks/useCurrencyBalance'

export interface EstimatedValueProps {
  symbol: string
}

export const EstimatedValue = ({ symbol }: EstimatedValueProps) => {
  const { currencyBalance } = useCurrencyBalance(symbol)
  const noBalance = currencyBalance <= 0

  const { watch } = useFormContext<CommitmentFormValues>()
  const units = watch('numberOfUnits', 0)
  const pricePerUnit = watch('pricePerUnit', 0)

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography
          variant='body1'
          color={noBalance ? 'text.disabled' : 'text.secondary'}
          textAlign='right'
        >
          Investment amount:
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant='h5'
          textAlign='right'
          color={noBalance ? 'text.disabled' : 'text.primary'}
        >
          {formatMoney(units * (pricePerUnit ?? 0), symbol)}
        </Typography>
      </Grid>
    </Grid>
  )
}
