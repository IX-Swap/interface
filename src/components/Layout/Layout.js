import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

import classnames from 'classnames'
import useStyles from './styles'

import Header from '../Header'
import Sidebar from '../Sidebar'

import Dashboard from '../../pages/dashboard'
import DeveloperPanel from '../../pages/developer-panel'
import Tokens from '../../pages/tokens'
import Exchange from '../../pages/exchange'
import Explorer from '../../pages/explorer'
import Accounts from '../../pages/accounts'
import Identity from '../../pages/identity'
import Invest from '../../pages/invest'

import { useLayoutState } from '../../context/LayoutContext'
function Layout (props) {
  const classes = useStyles()

  const layoutState = useLayoutState()
  return (
    <div className={classes.root}>
      <Header history={props.history} />
      <Sidebar />
      <div
        className={classnames(classes.content, {
          [classes.contentShift]: layoutState.isSidebarOpened
        })}
      >
        <div className={classes.fakeToolbar} />
        <Switch>
          <Route path='/app/dashboard' component={Dashboard} />
          <Route path='/app/developer-panel' component={DeveloperPanel} />
          <Route path='/app/exchange' component={Exchange} />
          <Route path='/app/explorer' component={Explorer} />
          <Route path='/app/accounts' component={Accounts} />
          <Route path='/app/tokens' component={Tokens} />
          <Route path='/app/identity' component={Identity} />
          <Route path='/app/invest' component={Invest} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(Layout)
