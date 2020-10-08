import React from 'react'
import { Container, Paper, Tabs, Tab, Divider } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useInvestListRouter } from '../investListRouter'

export const InvestList = () => {
  const { current, paths, renderRoutes } = useInvestListRouter()
  const currentTabIdx = current.path === paths.offerings ? 0 : 1

  return (
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
          to={paths.offerings}
          replace
        />
        <Tab
          value={1}
          label='My Commitments'
          component={Link}
          to={paths.commitments}
          replace
        />
      </Tabs>
      <Divider />
      <Container>{renderRoutes()}</Container>
    </Paper>
  )
}
