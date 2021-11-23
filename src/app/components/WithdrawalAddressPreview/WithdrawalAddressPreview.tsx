import React from 'react'
import { Grid, Box, Typography } from '@material-ui/core'
import { LabelledValue } from 'components/LabelledValue'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import CheckIcon from '@material-ui/icons/Check'
import { BlockchainWalletView } from 'app/components/BlockchainWalletView'

export interface WithdrawalAddressViewProps {
  data: WithdrawalAddress
}

export const WithdrawalAddressPreview = (props: WithdrawalAddressViewProps) => {
  const { data } = props

  useSetPageTitle(data.network.name)

  return (
    <Grid container justify='center' direction='column'>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <LabelledValue label='Network Type' value={data.network.name} />
        </Grid>
        <Grid item xs={6}>
          <LabelledValue label='Blockchain Address' value={data.address} />
        </Grid>
        {data.wallet !== undefined && (
          <Grid item xs={6}>
            <LabelledValue
              label='Wallet'
              value={<BlockchainWalletView wallet={data.wallet} />}
            />
          </Grid>
        )}
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
