import React from 'react'
import { Grid } from '@material-ui/core'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import Table from './components/Table'

// data
import mock from './mock-primary-data'

export default function Primary (props) {
  return (
    <>
      <PageTitle title='Primary Market' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title='Digital Security Offerings' upperTitle noBodyPadding>
            <Table data={mock.primaryOfferings} location={props} />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
