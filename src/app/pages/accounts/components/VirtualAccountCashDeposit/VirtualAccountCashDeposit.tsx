import { Box, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { RadioTabButton } from 'app/pages/accounts/components/VirtualAccountCashDeposit/RadioTabButton'
import { VirtualAccountTabs } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabs'
import { Fast } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import { VirtualAccountTabPanel } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabPanel'
import { Meps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Meps'
import { Tt } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Tt'
import { AchCredits } from 'app/pages/accounts/components/VirtualAccountCashDeposit/AchCredit'

export const VirtualAccountCashDeposit = () => {
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }
  return (
    <Grid direction='column'>
      <Grid item>
        <Box mt={3} px={3}>
          <Typography>
            <Box component='span' fontSize={16} fontWeight={600}>
              Choose Your Cash Deposit Method:
            </Box>
          </Typography>
        </Box>
        <Box px={3} mb={2}>
          <VirtualAccountTabs
            TabIndicatorProps={{ style: { background: 'transparent' } }}
            value={activeTab}
            onChange={handleChange}
          >
            <RadioTabButton disableRipple label='FAST' />
            <RadioTabButton disableRipple label='MEPS' />
            <RadioTabButton disableRipple label='TT' />
            <RadioTabButton disableRipple label='ACH Credit' />
          </VirtualAccountTabs>
        </Box>
      </Grid>
      <Grid item>
        <VirtualAccountTabPanel value={activeTab} index={0}>
          <Fast />
        </VirtualAccountTabPanel>
        <VirtualAccountTabPanel value={activeTab} index={1}>
          <Meps />
        </VirtualAccountTabPanel>
        <VirtualAccountTabPanel value={activeTab} index={2}>
          <Tt />
        </VirtualAccountTabPanel>
        <VirtualAccountTabPanel value={activeTab} index={3}>
          <AchCredits />
        </VirtualAccountTabPanel>
      </Grid>
    </Grid>
  )
}
