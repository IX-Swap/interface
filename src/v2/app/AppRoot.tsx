import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'
import classnames from 'classnames'
import { Header } from 'v2/app/components/Header/Header'
import { Sidebar } from 'v2/app/components/Sidebar/Sidebar'
import useStyles from './styles'
import { useStore as useLayoutStore } from '../context/layout'
import { useAppRouter } from 'v2/app/router'
import { useAuth } from 'v2/hooks/auth/useAuth'

export const AppRoot: React.FC = observer(() => {
  const { isAuthenticated } = useAuth()
  const layoutState = useLayoutStore()
  const history = useHistory()
  const classes = useStyles()
  const { renderRoutes } = useAppRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      history.replace('/auth')
    }
  }, [isAuthenticated, history])

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
})
