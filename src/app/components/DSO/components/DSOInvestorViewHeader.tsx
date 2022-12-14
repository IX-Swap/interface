import React from 'react'
import { Grid, Box, Paper } from '@mui/material'
import { DigitalSecurityOffering } from 'types/dso'
import { DSOInvestorOverview } from 'app/components/DSO/components/DSOInvestorOverview'
import { DSOInvestButton } from 'app/components/DSO/components/DSOInvestButton'
import { DSOTitle } from 'app/components/DSO/components/DSOTitle'
import { OverviewValue } from 'app/pages/invest/components/MakeCommitment/OverviewValue'
import { DSOBlockchainDetails } from 'app/pages/invest/components/DSOBlockChainDetails/DSOBlockchainDetails'
import { Divider } from 'ui/Divider'
import { formatMoney } from 'helpers/numbers'

export interface DSOInvestorViewHeaderProps {
  dso: DigitalSecurityOffering
}

export const DSOInvestorViewHeader = ({ dso }: DSOInvestorViewHeaderProps) => {
  return (
    <Paper sx={{ p: { xs: 2, md: 5 }, borderRadius: 2 }}>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='space-between'
          spacing={3}
        >
          <Grid item container xs={12} md={6} alignItems='center' spacing={3}>
            <Grid
              item
              sx={{
                minWidth: '50%',
                width: {
                  xs: '100%',
                  sm: 'auto'
                }
              }}
            >
              <DSOTitle dso={dso} />
            </Grid>
            <Grid
              item
              sx={{
                width: {
                  xs: '100%',
                  sm: 'auto'
                }
              }}
            >
              <OverviewValue
                label='Unit Price'
                value={formatMoney(dso.pricePerUnit, dso.currency.symbol, true)}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            md={6}
            justifyContent='space-between'
            alignItems='center'
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={8}>
              <DSOBlockchainDetails dso={dso} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box display='flex' width='100%' justifyContent='flex-end'>
                <DSOInvestButton dso={dso} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <DSOInvestorOverview dso={dso} />
        </Grid>
      </Grid>
    </Paper>
  )
}
