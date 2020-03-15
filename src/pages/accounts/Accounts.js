import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import PageTitle from '../../components/PageTitle'

import Widget from '../../components/Widget/Widget'

function Explorer (props) {
  return (
    <Grid container title='Accounts'>
      <PageTitle title='Accounts' />
      <Grid item xs={12} sm={12} md={12}>
        <Widget title='Account Components' disableWidgetMenu>
          <Grid container>
            <Grid item sm={12} md={3}>
              Blocks and Transactions
              <ul>
                <li>
                  <a href='/#/app/accounts/transfer-token'>BlockInfo</a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Switch>
        <Route
          path='/app/accounts/transfer-token'
          component={() => 'accounts '}
        />
      </Switch>
    </Grid>
  )
}

export default withRouter(Explorer)
