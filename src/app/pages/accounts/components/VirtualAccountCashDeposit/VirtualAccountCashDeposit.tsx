import { Box, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { RadioTabButton } from 'app/pages/accounts/components/VirtualAccountCashDeposit/RadioTabButton'
import { VirtualAccountTabs } from 'app/pages/accounts/components/VirtualAccountCashDeposit/VirtualAccountTabs'
import { Fast } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import { Meps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Meps'
import { Tt } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Tt'
import { AchCredits } from 'app/pages/accounts/components/VirtualAccountCashDeposit/AchCredit'
import { TabPanel } from 'components/TabPanel'
import { VirtualAccount } from 'types/virtualAccount'

export interface VirtualAccountCashDepositProps {
  virtualAccountDetails: VirtualAccount
}

export const VirtualAccountCashDeposit = ({
  virtualAccountDetails
}: VirtualAccountCashDepositProps) => {
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
            <RadioTabButton disableRipple label='ACH Credit' />
            <RadioTabButton disableRipple label='TT' />
            <RadioTabButton disableRipple label='MEPS' />
          </VirtualAccountTabs>
        </Box>
      </Grid>
      <Grid item>
        <TabPanel value={activeTab} index={0} pt={0}>
          <Fast
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1} pt={0}>
          <AchCredits
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={2} pt={0}>
          <Tt
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={3} pt={0}>
          <Meps
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
      </Grid>
    </Grid>
  )
}
