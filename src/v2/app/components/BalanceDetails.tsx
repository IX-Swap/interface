import React from 'react'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'
import { AssetBalance } from 'v2/types/balance'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'
import { getOfferingName } from 'v2/helpers/strings'
import { privateClassNames } from 'v2/helpers/classnames'

export interface BalanceDetailsProps {
  data: AssetBalance
}

export const BalanceDetails = (props: BalanceDetailsProps) => {
  const { data } = props

  useSetPageTitle(getOfferingName(data))

  return (
    <Paper className={privateClassNames()}>
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
