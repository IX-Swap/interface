import React from 'react'
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom'

import classnames from 'classnames'
import useStyles from './styles'

import Header from '../Header'
import Sidebar from '../Sidebar'

import Dashboard from '../../pages/dashboard'
import DSOBoard from '../../pages/dso-board'
import TokenDeploy from '../../pages/token-deploy'
import TokenList from '../../pages/token-list'
import TokenIssue from '../../pages/token-issue'
import Offering from '../../pages/offering'
import Secondary from '../../pages/secondary'
import Exchange from '../../pages/exchange'

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
          <Route path='/app/invest' component={DSOBoard} />
          <Route path='/app/token-deploy' component={TokenDeploy} />
          <Route path='/app/token-list' component={TokenList} />
          <Route path='/app/token-issue' component={TokenIssue} />
          <Route path='/app/offering' component={Offering} />
          <Route path='/app/secondary' component={Secondary} />
          <Route path='/app/exchange' component={Exchange} />
          {/* <Route
            exact
            path='/app/ui'
            render={() => <Redirect to='/app/ui/icons' />}
          /> */}
        </Switch>
      </div>
    </div>
  )
}

export default withRouter(Layout)
