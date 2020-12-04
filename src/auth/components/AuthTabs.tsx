import React from 'react'
import { Link } from 'react-router-dom'
import { Tab, Tabs } from '@material-ui/core'
import { useUserStore } from 'auth/context'
import { observer } from 'mobx-react'
import { useAuthRouter } from 'auth/router'

export const AuthTabs: React.FC = observer(() => {
  const { paths } = useAuthRouter()
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
        to={paths.login}
        data-testid='login'
      />
      <Tab
        label='New User'
        to={paths.signup}
        style={{ fontSize: 18 }}
        component={Link}
        data-testid='register'
      />
    </Tabs>
  )
})
