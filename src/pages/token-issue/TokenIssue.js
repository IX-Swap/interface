import React from 'react'
import { Grid } from '@material-ui/core'
import { withRouter } from 'react-router-dom'

import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import TokenIssueForm from './components/TokenIssueForm'

import { TokenIssueProvider } from '../../context/TokenIssueContext'

function TokenIssue () {

  return (
    <TokenIssueProvider>
      <PageTitle title='Issue Tokens' />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget disableWidgetMenu>
            <TokenIssueForm />
          </Widget>
        </Grid>
      </Grid>
    </TokenIssueProvider>
  )
}

export default withRouter(TokenIssue)
