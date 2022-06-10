import { Box, Grid } from '@mui/material'
import { useFinancialSummary } from 'app/pages/exchange/hooks/useFinancialSummary'
import { BlockchainWallet } from 'app/pages/invest/components/BlockchainWallet/BlockchainWallet'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PairListDropdown } from '../PairListDropdown/PairListDropdown'
import { InvestRoute as path } from 'app/pages/invest/router/config'
import { usePairDSO } from 'app/pages/invest/hooks/usePairDSO'
export const ShortFinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  const dso = usePairDSO()
  return (
    <Grid container>
      <Grid item xs={5}>
        <Box
          display='flex'
          justifyContent={{ xs: 'space-between', md: 'flex-start' }}
          alignItems='flex-start'
          padding={1}
        >
          <Box flexGrow={1} width={{ xs: '50%', md: '100%' }}>
            <PairListDropdown
              pairName={data?.name}
              path={path.view}
              params={{
                dsoId: dso?._id,
                issuerId: dso?.user
              }}
              hideDropdown
            />
          </Box>
        </Box>
      </Grid>
      <Grid item xs={7}>
        <Box
          display='flex'
          justifyContent={'flex-end'}
          alignItems='center'
          padding={[1, 0.5]}
        >
          <BlockchainWallet />
        </Box>
      </Grid>
    </Grid>
  )
}
