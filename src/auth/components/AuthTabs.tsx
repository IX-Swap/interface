import React from 'react'
import { Link } from 'react-router-dom'
import { Tabs, Tab } from '@material-ui/core'
import { useUserStore } from 'auth/context'
import { useStyles } from './AuthTabs.styles'
import { observer } from 'mobx-react'
import { useAuthRouter } from 'auth/router'

export const AuthTabs: React.FC = observer(() => {
  const { paths } = useAuthRouter()
  const classes = useStyles()
  const userStore = useUserStore()

  const handleChange = (_: React.ChangeEvent<{}>, index: number): void => {
    userStore.setActiveTab(index)
  }

  return (
    <Tabs
      className={classes.container}
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
        to={paths.login}
        component={Link}
        style={{ fontSize: 18 }}
        data-testid='login'
      />
      <Tab
        label='New User'
        classes={{ root: classes.tab }}
        to={paths.signup}
        component={Link}
        data-testid='register'
      />
    </Tabs>
  )
})
