import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { LabelledValue } from 'components/LabelledValue'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { WithdrawalAddress } from 'types/withdrawalAddress'
import CheckIcon from '@mui/icons-material/Check'
import { BlockchainWalletView } from 'app/components/BlockchainWalletView'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'

export interface WithdrawalAddressViewProps {
  data: WithdrawalAddress
}

export const WithdrawalAddressPreview = (props: WithdrawalAddressViewProps) => {
  const { data } = props

  useSetPageTitle(data.network.name)

  return (
    <Grid container justifyContent='center' direction='column'>
      <FieldContainer>
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
        </Grid>{' '}
        <Box py={2} />
        <Grid container>
          <Grid item sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <CheckIcon color='primary' />
            <Typography>
              I understand and agree that InvestaX will check this address
              against fradulent activities
            </Typography>
          </Grid>
        </Grid>
      </FieldContainer>
    </Grid>
  )
}
