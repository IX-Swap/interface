import { Box, Grid, Typography, Tabs } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { RadioTabButton } from 'app/pages/accounts/components/VirtualAccountCashDeposit/RadioTabButton'
import { Fast } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Fast'
import { Meps } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Meps'
import { Tt } from 'app/pages/accounts/components/VirtualAccountCashDeposit/Tt'
import { AchCredits } from 'app/pages/accounts/components/VirtualAccountCashDeposit/AchCredit'
import { TabPanel } from 'components/TabPanel'
import { VirtualAccount } from 'types/virtualAccount'
import { useStyles } from 'app/pages/accounts/components/VirtualAccountCashDeposit/shared.styles'

export interface VirtualAccountCashDepositProps {
  virtualAccountDetails: VirtualAccount
}

export const VirtualAccountCashDeposit = ({
  virtualAccountDetails
}: VirtualAccountCashDepositProps) => {
  const { tabStyle } = useStyles()
  const currencyIsSGD = virtualAccountDetails.currency === 'SGD'
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue)
  }

  useEffect(() => setActiveTab(0), [currencyIsSGD])

  return (
    <Grid container direction='column'>
      <Grid item>
        <Box sx={{ mt: { xs: 3, sm: 5 }, px: { xs: 3, sm: 5 } }}>
          <Typography color='gray'>
            <Box component='span' fontSize={14} fontWeight={500}>
              Choose your cash deposit method:
            </Box>
          </Typography>
        </Box>
        <Box sx={{ px: { xs: 3, sm: 5 }, mt: 4, mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            variant='fullWidth'
            className={tabStyle}
          >
            {currencyIsSGD && <RadioTabButton disableRipple label='FAST' />}
            <RadioTabButton disableRipple label='ACH Credit' />
            <RadioTabButton disableRipple label='TT' />
            {currencyIsSGD && <RadioTabButton disableRipple label='MEPS' />}
          </Tabs>
        </Box>
      </Grid>
      <Grid item>
        {currencyIsSGD && (
          <TabPanel value={activeTab} index={0} pt={0}>
            <Fast
              accountId={virtualAccountDetails.accountNumber}
              currency={virtualAccountDetails.currency}
            />
          </TabPanel>
        )}
        <TabPanel value={activeTab} index={!currencyIsSGD ? 0 : 1} pt={0}>
          <AchCredits
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={!currencyIsSGD ? 1 : 2} pt={0}>
          <Tt
            accountId={virtualAccountDetails.accountNumber}
            currency={virtualAccountDetails.currency}
          />
        </TabPanel>
        {currencyIsSGD && (
          <TabPanel value={activeTab} index={3} pt={0}>
            <Meps
              accountId={virtualAccountDetails.accountNumber}
              currency={virtualAccountDetails.currency}
            />
          </TabPanel>
        )}
      </Grid>
    </Grid>
  )
}
