import React, { useState } from 'react'
import { Container, Paper, Box, Tabs, Tab, Divider } from '@material-ui/core'
import { useStore } from 'v2/app/pages/invest/context'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Dso } from 'v2/types/dso'
import OfferingsList from 'v2/app/components/digital-security/list'
import MyCommitments from 'v2/app/pages/invest/components/my-commitments'

const InvestList = () => {
  const investState = useStore()
  const history = useHistory()
  const match = useRouteMatch()
  const [tab, setTab] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTab(newValue)
  }

  const handleRowClick = (dso: Dso) => {
    investState.selectDso(dso)
    history.push(`${match.path}view`)
  }

  return (
    <Container>
      <Paper square>
        <Tabs
          variant='fullWidth'
          value={tab}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab value={0} label='Listings' />
          <Tab value={1} label='My Commitments' />
        </Tabs>
        <Divider />
        <Container>
          <Box p={4}>
            {tab === 0 ? (
              <OfferingsList
                handleRowClick={handleRowClick}
                filter={{ status: 'Approved' }}
              />
            ) : (
              <MyCommitments />
            )}
          </Box>
        </Container>
      </Paper>
    </Container>
  )
}

export default InvestList
