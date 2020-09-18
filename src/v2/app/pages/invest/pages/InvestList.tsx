import React from 'react'
import { Container, Paper, Box, Tabs, Tab, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useInvestListRouter } from '../investListRouter'

export const InvestList = () => {
  const { current, routes, renderRoutes } = useInvestListRouter()
  const currentTabIdx = current.path === routes.offerings ? 0 : 1

  return (
    <Container>
      <Paper square>
        <Tabs
          variant='fullWidth'
          value={currentTabIdx}
          indicatorColor='primary'
          textColor='primary'
          aria-label='disabled tabs example'
        >
          <Tab
            value={0}
            label='Listings'
            component={Link}
            to={routes.offerings}
          />
          <Tab
            value={1}
            label='My Commitments'
            component={Link}
            to={routes.commiments}
          />
        </Tabs>
        <Divider />
        <Container>
          <Box p={4}>{renderRoutes()}</Box>
        </Container>
      </Paper>
    </Container>
  )
}
