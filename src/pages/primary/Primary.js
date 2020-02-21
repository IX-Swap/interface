import React from 'react'
import { Grid } from '@material-ui/core'

// components
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import Table from './components/Table'

import Axios from 'axios'

export default function Primary (props) {

  // local
  const [dsoList, setDsoList] = React.useState({
    data: []
  })

  const getDsoListRequest = async () => {
    const { data } = await Axios.get('http://localhost:3456/contracts/tokens')
    if (data.message === 'OK') {
      setDsoList({ data: data.data })
    }
  }


  return (
    <>
      <PageTitle title='DSO Board' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding>
            <Table data={dsoList.data} location={props} />
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
