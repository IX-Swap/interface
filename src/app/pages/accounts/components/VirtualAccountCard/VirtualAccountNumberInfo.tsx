import { Grid, Typography } from '@material-ui/core'
import { TextAlignment } from 'components/LabelledValue'
import { formatAmount } from 'helpers/numbers'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface VirtualAccountNumberInfoProps {
  accountNumber: string
  currency: ValidCurrency
  availableBalance: number
  onHold: number
}

export interface ValueDisplayProps {
  value: string
  align?: TextAlignment
}
export const ValueDisplay = ({ value, align }: ValueDisplayProps) => {
  return (
    <Typography
      style={{
        fontSize: 22,
        color: '#fff',
        fontWeight: 500,
        textAlign: align ?? 'left'
      }}
    >
      {value}
    </Typography>
  )
}

export interface LabelProps {
  label: string
  align?: TextAlignment
}
export const Label = ({ label, align }: LabelProps) => {
  return (
    <Typography
      variant='body1'
      style={{ color: '#D6D6D6', textAlign: align ?? 'left' }}
    >
      {label}
    </Typography>
  )
}

export const VirtualAccountNumberInfo = ({
  accountNumber,
  currency,
  availableBalance,
  onHold
}: VirtualAccountNumberInfoProps) => {
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      style={{ height: '100%' }}
    >
      <Grid item>
        <ValueDisplay value={currency} />
      </Grid>
      <Grid item>
        <Label label='Account Number' />
        <ValueDisplay value={accountNumber} />
      </Grid>
      <Grid item container justifyContent='space-between'>
        <Grid item xs={6}>
          <Label label='Available Balance' />
          <ValueDisplay value={formatAmount(availableBalance)} />
        </Grid>
        <Grid item xs={6}>
          <Label label='On-Hold' align='right' />
          <ValueDisplay value={formatAmount(onHold)} align='right' />
        </Grid>
      </Grid>
    </Grid>
  )
}
