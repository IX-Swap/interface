import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { LabelledValue } from 'v2/components/LabelledValue'
import { useSetPageTitle } from 'v2/app/hooks/useSetPageTitle'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'
import CheckIcon from '@material-ui/icons/Check'

export interface WithdrawalAddressViewProps {
  data: WithdrawalAddress
}

export const WithdrawalAddressView = (props: WithdrawalAddressViewProps) => {
  const { data } = props

  useSetPageTitle(data.network.name)

  return (
    <Grid container justify='center' direction='column'>
      <Grid container>
        <Grid item xs={6}>
          <LabelledValue label='Network Type' value={data.network.name} />
        </Grid>
        <Grid item xs={6}>
          <LabelledValue label='Withdrawal Address' value={data.address} />
        </Grid>
      </Grid>
      <Box py={2} />
      <Grid container>
        <Grid item>
          <CheckIcon color='primary' />
        </Grid>
        <Box px={0.75} />
        <Grid item>
          <Typography>
            I understand and agree that InvestaX will check this address against
            fradulent activities
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
