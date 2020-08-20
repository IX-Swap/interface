import React, { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import classnames from 'classnames'

import Header from './components/header'
import Sidebar from './components/sidebar'
import useStyles from './styles'

import { useUserStore } from 'v2/auth/context'
import { useStore as useLayoutStore } from '../context/layout'
import { useAppRouter } from 'v2/app/router'

const AppRoot: React.FC = () => {
  const userState = useUserStore()
  const layoutState = useLayoutStore()
  const history = useHistory()
  const classes = useStyles()
  const { renderRoutes } = useAppRouter()

  const updateAppAuthStatus = useCallback(() => {
    if (!userState.isAuthenticated) {
      history.replace('/auth')
    }
  }, [history, userState.isAuthenticated])

  useEffect(() => {
    updateAppAuthStatus()
  }, [userState.isAuthenticated, updateAppAuthStatus])

  return (
    <div className={classes.root}>
      <Header />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened
        })}
      >
        {renderRoutes()}
      </div>
    </div>
  )
}

export default observer(AppRoot)
