import { Grid } from '@mui/material'
import { LabelledValue, LabelledValueProps } from 'components/LabelledValue'
import React from 'react'

export interface CashDepositDetailsProps {
  data: LabelledValueProps[]
}

export const CashDepositDetails = ({ data }: CashDepositDetailsProps) => {
  return (
    <>
      {data.map(item => (
        <Grid item xs={12} sm={6}>
          <LabelledValue labelColor='gray' {...item} />
        </Grid>
      ))}
    </>
  )
}
