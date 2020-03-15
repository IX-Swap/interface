import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import PageTitle from '../../components/PageTitle'

// import { TokenTransferProvider } from '../../context/TokenTransferContext'
import { TokenDeployProvider } from '../../context/TokenDeployContext'
import { TokenIssueProvider } from '../../context/TokenIssueContext'
import { TokenListProvider } from '../../context/TokenListContext'

import TokenTransfer from './token-transfer'
import TokenList from './token-list'
import TokenIssue from './token-issue'
import TokenDeploy from './token-deploy'

import Widget from '../../components/Widget/Widget'

function Tokens (props) {
  return (
    <Grid container title='Token' spacing={3}>
      <PageTitle title='Tokens' />
      <Grid item xs={12} sm={12} md={12}>
        <Widget title='Token Components' disableWidgetMenu>
          <ul>
            <li>
              <a href='/#/app/tokens/deploy'>Deploy</a>
            </li>
            <li>
              <a href='/#/app/tokens/list'>List</a>
            </li>
            <li>
              <a href='/#/app/tokens/issue'>Issue</a>
            </li>
            <li>
              <a href='/#/app/tokens/transfer'>Transfer</a>
            </li>
          </ul>
        </Widget>
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={8}>
        <Switch>
          {/* <Route
          path='/app/tokens/transfer'
          component={() => (
            <TokenTransferProvider>
              <TokenTransfer />
            </TokenTransferProvider>
          )}
        /> */}
          <Route
            path='/app/tokens/list'
            component={() => (
              <TokenListProvider>
                <TokenList />
              </TokenListProvider>
            )}
          />
          <Route
            path='/app/tokens/issue'
            component={() => (
              <TokenIssueProvider>
                <TokenIssue />
              </TokenIssueProvider>
            )}
          />
          <Route
            path='/app/tokens/deploy'
            component={() => (
              <TokenDeployProvider>
                <TokenDeploy />
              </TokenDeployProvider>
            )}
          />
        </Switch>
      </Grid>
    </Grid>
  )
}

export default withRouter(Tokens)
