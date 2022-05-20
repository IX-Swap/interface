import { Grid, useTheme } from '@mui/material'
import { LabelledValue, LabelledValueProps } from 'components/LabelledValue'
import React from 'react'

export interface CashDepositDetailsProps {
  data: LabelledValueProps[]
}

export const CashDepositDetails = ({ data }: CashDepositDetailsProps) => {
  const theme = useTheme()
  return (
    <>
      {data.map(item => (
        <Grid item xs={12} sm={6}>
          <LabelledValue
            valueColor={theme.palette.dialog.color}
            labelColor='gray'
            {...item}
          />
        </Grid>
      ))}
    </>
  )
}
