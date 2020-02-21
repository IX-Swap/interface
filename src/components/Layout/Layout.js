import React from 'react'
import {
  Route,
  Switch,
  // Redirect,
  withRouter
} from 'react-router-dom'
import classnames from 'classnames'

// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'

// pages
import Dashboard from '../../pages/dashboard'
import Primary from '../../pages/primary'
import CreateDso from '../../pages/create-dso'

import Offering from '../../pages/offering'
import Secondary from '../../pages/secondary'
import Exchange from '../../pages/exchange'
// context
import { useLayoutState } from '../../context/LayoutContext'

function Layout (props) {
  var classes = useStyles()

  // global
  var layoutState = useLayoutState()
  return (
    <div className={classes.root}>
      <>
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
            <Route path='/app/primary' component={Primary} />
            <Route path='/app/create-dso' component={CreateDso} />
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
      </>
    </div>
  )
}

export default withRouter(Layout)
