import React from 'react'
import { Grid } from '@material-ui/core'

import PageTitle from '../../../components/PageTitle/PageTitle'
import Widget from '../../../components/Widget/Widget'
import TokenListTable from './components/TokenListTable'

import { TokenListProvider } from '../../../context/TokenListContext'

export default function TokenList (props) {
  return (
    <TokenListProvider>
      <PageTitle title='Token List' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding disableWidgetMenu>
            <TokenListTable />
          </Widget>
        </Grid>
      </Grid>
    </TokenListProvider>
  )
}
