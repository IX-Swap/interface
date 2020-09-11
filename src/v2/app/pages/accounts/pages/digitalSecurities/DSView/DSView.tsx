import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useParams } from 'react-router-dom'
import { useAllBalances } from 'v2/hooks/balance/useAllBalances'
import { useAssetsData } from 'v2/hooks/asset/useAssetsData'

export const DSView: React.FC = () => {
  const { balanceId } = useParams<{ balanceId: string }>()
  const { data: balances, status: balancesStatus } = useAllBalances()
  const { data: assets, status: assetsStatus } = useAssetsData('Security')

  if (balancesStatus === 'loading' || assetsStatus === 'loading') {
    return null
  }

  const balance = balances.map[balanceId]
  const asset = assets.map[balance.assetId]

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Box px={4}>
          <Grid container alignItems='baseline'>
            <Typography variant='h2'>{asset.symbol}</Typography>
            <Box mx={0.5} />
            <Typography variant='h5'>{asset.name}</Typography>
          </Grid>
        </Box>
      </Grid>
      <Grid item>
        <Box px={4}>
          <Typography variant='h3'>About {asset.symbol}</Typography>
        </Box>
        <Box px={4} py={2} pb={4}>
          <span dangerouslySetInnerHTML={{ __html: asset.description ?? '' }} />
        </Box>
      </Grid>
    </Grid>
  )
}
