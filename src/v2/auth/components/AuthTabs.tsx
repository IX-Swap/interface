import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { useUserStore } from 'v2/auth/context'
import useStyles from '../styles'
import { observer } from 'mobx-react'
import { useAuthRouter } from 'v2/auth/router'

export const AuthTabs: React.FC = observer(() => {
  const { routes } = useAuthRouter()
  const classes = useStyles()
  const userStore = useUserStore()

  const handleChange = (_: React.ChangeEvent<{}>, index: number): void => {
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
        to={routes.login}
        component={Link}
        data-testid='login'
      />
      <Tab
        label='New User'
        classes={{ root: classes.tab }}
        to={routes.signup}
        component={Link}
        data-testid='register'
      />
    </Tabs>
  )
})
