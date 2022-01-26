import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs } from '@mui/material'
import { useUserStore } from 'auth/context'
import { observer } from 'mobx-react'
import { AuthRoute } from 'auth/router/config'

export const AuthTabs: React.FC = observer(() => {
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
      style={{ marginBottom: 24 }}
    >
      <Tab
        label='Log in'
        component={Link}
        style={{ fontSize: 18 }}
        to={AuthRoute.login}
        data-testid='login'
      />
      <Tab
        label='New User'
        to={AuthRoute.signup}
        style={{ fontSize: 18 }}
        component={Link}
        data-testid='register'
      />
    </Tabs>
  )
})
