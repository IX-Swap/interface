import React from 'react'
import { Grid } from '@material-ui/core'

import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import TokenIssueForm from './components/TokenIssueForm'

import { TokenIssueProvider } from '../../context/TokenIssueContext'

export default function TokenIssuePage (props) {

  return (
    <TokenIssueProvider>
      <PageTitle title='Issue Tokens' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding>
            <TokenIssueForm />
          </Widget>
        </Grid>
      </Grid>
    </TokenIssueProvider>
  )
}