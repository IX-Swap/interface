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
import Security from '../../pages/security'

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
          <Route path='/1/dashboard' component={Dashboard} />
          <Route path='/1/developer-panel' component={DeveloperPanel} />
          <Route path='/1/exchange' component={Exchange} />
          <Route path='/1/explorer' component={Explorer} />
          <Route path='/1/accounts' component={Accounts} />
          <Route path='/1/tokens' component={Tokens} />
          <Route path='/1/identity' component={Identity} />
          <Route path='/1/invest' component={Invest} />
          <Route path='/1/security' component={Security} />
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(Layout)
