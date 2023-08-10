import { Tabs, Tab, Box, Grid, Typography } from '@mui/material'
import { TabPanel } from 'components/TabPanel'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { WideContainer } from 'app/components/WideContainer/WideContainer'
import React from 'react'
import { MatchedOrders } from './matched/MatchedOrders'
import { UnmatchedOrders } from './unmatched/UnmatchedOrders'
import { Filters } from 'app/pages/authorizer/components/upgrade/Filters'
import { useIndividualAccountSettings } from 'app/pages/admin/hooks/useIndividualAccountSettings'
import { useStyles } from './unmatched/OTCTrades.style'
// import { useStyles } from 'app/pages/admin/components/UserDetails.styles'

export const OTCTrades = () => {
  const { value, handleChange } = useIndividualAccountSettings(0)
  const classes = useStyles()
  const { tabBarStyle } = classes
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Authorize OTC Trades' />
      </Grid>

      <WideContainer>
        <Grid item container direction='column' gap={1}>
          <Grid item container direction='column' gap={0.1}>
            <Typography
              style={{
                background: 'white',
                padding: '30px'
              }}
              variant='h4'
              fontWeight={600}
            >
              Matched Orders
            </Typography>
            <Grid style={{ background: 'white' }}>
              <Filters />
            </Grid>
          </Grid>
          <MatchedOrders />

          <Grid item>
            <Typography
              style={{
                background: 'white',
                padding: '25px',
                marginBottom: '2px'
              }}
              variant='h4'
              fontWeight={600}
            >
              Unmatched Orders
            </Typography>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: value === 0 ? '#1FBC2F' : ''
                  }
                }}
                textColor='primary'
                className={tabBarStyle}
              >
                <Tab style={{ color: '#1FBC2F' }} label='Buy' />
                <Tab style={{ color: '#F44949' }} label='Sell' />
              </Tabs>
              <Grid style={{ background: 'white', padding: '40px' }}>
                <Filters type={'matched'} />
              </Grid>
              <Grid>
                <TabPanel withoutSpacing type='OTC' value={value} index={0}>
                  <UnmatchedOrders side={'BUY'} title={''} />
                </TabPanel>
                <TabPanel withoutSpacing type='OTC' value={value} index={1}>
                  <UnmatchedOrders side='SELL' title={''} />
                </TabPanel>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </WideContainer>
    </Grid>
  )
}
