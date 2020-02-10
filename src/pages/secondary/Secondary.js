import React from 'react'
import { Grid } from '@material-ui/core'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import Table from './components/Table'

// data
import mock from './mock-secondary-data'

export default function Secondary (props) {
  return (
    <>
      <PageTitle title='Secondary Exchange' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title='Listed DSOs' upperTitle noBodyPadding>
            <Table data={mock.primaryOfferings} location={props} />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
