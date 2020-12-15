import React from 'react'
import { Container, Paper, Tabs, Tab, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useInvestListRouter } from 'app/pages/invest/routers/investLandingRouter'

export const InvestLanding = () => {
  const { current, paths, renderRoutes } = useInvestListRouter()
  const currentTabIdx = current.path.startsWith(paths.offerings) ? 0 : 1

  return (
    <Paper square>
      <Tabs
        variant='fullWidth'
        value={currentTabIdx}
        indicatorColor='primary'
        textColor='primary'
        aria-label='disabled tabs example'
        data-testid='invest-tabs'
      >
        <Tab
          value={0}
          label='Listings'
          component={Link}
          to={paths.offerings}
          replace
          data-testid='listings'
        />
        <Tab
          value={1}
          label='My Commitments'
          component={Link}
          to={paths.commitments}
          replace
          data-testid='commitments'
        />
      </Tabs>
      <Divider />
      <Container>{renderRoutes()}</Container>
    </Paper>
  )
}
