import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'
import { AssetBalance } from 'v2/types/balance'

export interface BalanceDetailsProps {
  data: Partial<AssetBalance>
}

export const BalanceDetails = (props: BalanceDetailsProps) => {
  const { data } = props

  return (
    <Paper>
      <Box px={4} py={2}>
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Typography variant='subtitle1'>
              {data.name} ({data.symbol})
            </Typography>
          </Grid>
          <LabelledValue
            label='Total Balance'
            value={data.balance}
            labelWeight='thin'
            row
          />
          <LabelledValue
            label='On Hold Balance'
            value={data.onHold}
            labelWeight='thin'
            row
          />
          <LabelledValue
            label='Available Balance'
            value={data.available}
            labelWeight='thin'
            row
          />
        </Grid>
      </Box>
    </Paper>
  )
}
