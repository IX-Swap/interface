import React from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import Table from './components/Table'

import mock from './mock-primary-data'
import Axios from 'axios'

export default function Primary (props) {
  // local
  const [values, setValues] = React.useState({
    message: '',
    data: []
  })

  const getDsoListRequest = async () => {
    const { data } = await Axios.get('http://localhost:3456/contracts/tokens')

    setValues({ message: data.message, data: data.data }) //...values, message: result.data.message, data: result.data.data })

    // if (message === 'ok') {
    //   setValues({ messsage, data })
    // }
  }

  getDsoListRequest()

  return (
    <>
      <PageTitle title='DSO Board' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding>
            <Table data={values.data} location={props} />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
