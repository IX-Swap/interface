import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { useUserStore } from 'v2/context/user'
import useStyles from '../styles'
import { observer } from 'mobx-react'

const AuthTabs = () => {
  const match = useRouteMatch()
  const classes = useStyles()
  const userState = useUserStore()

  const handleChange = (_: React.ChangeEvent<{}>, index: number) => {
    userState.setActiveTab(index)
  }

  return (
    <Tabs
      indicatorColor='primary'
      value={userState.activeTab}
      onChange={handleChange}
      textColor='primary'
      centered
    >
      <Tab
        label='Log in'
        classes={{ root: classes.tab }}
        to={match.path + '/login'}
        component={Link}
      />
      <Tab
        label='New User'
        classes={{ root: classes.tab }}
        to={match.path + '/register'}
        component={Link}
      />
    </Tabs>
  )
}

export default observer(AuthTabs)
