import { Box, Grid } from '@mui/material'
import { useFinancialSummary } from 'app/pages/invest/hooks/useFinancialSummary'
import { BlockchainWallet } from 'app/pages/invest/components/BlockchainWallet/BlockchainWallet'
import React from 'react'
import { useParams } from 'react-router-dom'
import { PairListDropdown } from 'app/pages/invest/components/PairListDropdown/PairListDropdown'
import { InvestRoute as path } from 'app/pages/invest/router/config'
import { useOTCPairDSO } from 'app/pages/invest/hooks/useOTCPairDSO'
import { useStyles } from './ShortFinancialSummary.styles'

export const ShortFinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  const dso = useOTCPairDSO()
  const classes = useStyles()

  return (
    <Grid className={classes.wrapper}>
      <Grid container>
        <Grid item xs={5}>
          <Box
            display='flex'
            justifyContent={{ xs: 'space-between', md: 'flex-start' }}
            alignItems='end'
            // padding={[1, 2]}
          >
            <Box flexGrow={1} width={{ xs: '50%', md: '100%' }}>
              <PairListDropdown
                pairName={data?.name}
                path={path.view}
                params={{
                  dsoId: dso?._id,
                  issuerId: dso?.user
                }}
                // hideDropdown
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
    </Grid>
  )
}
