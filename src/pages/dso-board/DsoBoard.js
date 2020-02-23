import React from 'react'
import { Grid } from '@material-ui/core'

import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget'
import Table from './components/Table'
// import { useDsoBoardDispatch, useDsoBoardState } from '../../context/DsoBoardContext'


export default function DsoBoard (props) {

  // const dsoBoardDispatch = useDsoBoardDispatch()
  // const dsoBoardState = useDsoBoardState()

  return (
    <>
      <PageTitle title='DSO Board' />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget noBodyPadding>
            {/* <Table data={[]} location={props} /> */}
          </Widget>
        </Grid>
      </Grid>
    </>
  )
}
