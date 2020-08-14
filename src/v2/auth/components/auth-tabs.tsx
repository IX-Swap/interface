import React from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { useUserStore } from 'v2/auth/context'
import useStyles from '../styles'
import { observer } from 'mobx-react'

const AuthTabs = () => {
  const match = useRouteMatch()
  const classes = useStyles()
  const userStore = useUserStore()

  const handleChange = (_: React.ChangeEvent<{}>, index: number) => {
    userStore.setActiveTab(index)
  }

  return (
    <Tabs
      indicatorColor='primary'
      value={userStore.activeTab}
      onChange={handleChange}
      textColor='primary'
      centered
      data-testid='auth-tabs'
    >
      <Tab
        label='Log in'
        classes={{ root: classes.tab }}
        to={match.path + '/login'}
        component={Link}
        data-testid='login'
      />
      <Tab
        label='New User'
        classes={{ root: classes.tab }}
        to={match.path + '/register'}
        component={Link}
        data-testid='register'
      />
    </Tabs>
  )
}

export default observer(AuthTabs)
