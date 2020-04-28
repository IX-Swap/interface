import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import PageTitle from '../../components/PageTitle'
import BlockInfo from './block-info'
import TransactionInfo from './transaction-info'
import EtherBalance from './ether-balance'
import ReadOnlyAbi from './read-only-abi'

import Widget from '../../components/Widget/Widget'
import { BlockInfoProvider } from '../../context/BlockInfoContext'
import { TransactionInfoProvider } from '../../context/TransactionInfoContext'
import { EtherBalanceProvider } from '../../context/EtherBalanceContext'
import { ReadOnlyAbiProvider } from '../../context/ReadOnlyAbiContext'

function Explorer (props) {
  return (
    <Grid container title='Explorer'>
      <PageTitle title='Blockchain Explorer' />
      <Grid item xs={12} sm={12} md={12}>
        <Widget title='Explorer Components' disableWidgetMenu>
          <Grid container>
            <Grid item sm={12} md={3}>
              Blocks and Transactions
              <ul>
                <li>
                  <a href='/explorer/block-info'>BlockInfo</a>
                </li>
                <li>
                  <a href='/explorer/transaction-info'>TransactionInfo</a>
                </li>
              </ul>
            </Grid>
            <Grid item sm={12} md={3}>
              Balances
              <ul>
                <li>
                  <a href='/explorer/ether-balance'>EtherBalance</a>
                </li>
              </ul>
            </Grid>
            <Grid item sm={12} md={3}>
              Contracts
              <ul>
                <li>
                  <a href='/explorer/read-only-abi'>ReadOnlyAbi</a>
                </li>
              </ul>
            </Grid>
          </Grid>
        </Widget>
      </Grid>
      <Switch>
        <Route
          path='/explorer/block-info'
          component={() => (
            <BlockInfoProvider>
              <BlockInfo />
            </BlockInfoProvider>
          )}
        />

        <Route
          path='/explorer/transaction-info'
          component={() => (
            <TransactionInfoProvider>
              <TransactionInfo />
            </TransactionInfoProvider>
          )}
        />

        <Route
          path='/explorer/ether-balance'
          component={() => (
            <EtherBalanceProvider>
              <EtherBalance />
            </EtherBalanceProvider>
          )}
        />

        <Route
          path='/explorer/read-only-abi'
          component={() => (
            <ReadOnlyAbiProvider>
              <ReadOnlyAbi />
            </ReadOnlyAbiProvider>
          )}
        />
      </Switch>
    </Grid>
  )
}

export default withRouter(Explorer)
