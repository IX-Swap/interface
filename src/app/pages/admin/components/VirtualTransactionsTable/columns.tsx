import { formatDateToMMDDYY, formatTime } from 'helpers/dates'
import { TableColumn } from 'types/util'
import React from 'react'
import { Grid } from '@material-ui/core'

const renderDateAndTimeField = (date: any) => {
  return (
    <Grid container direction={'column'}>
      <Grid item>{formatDateToMMDDYY(date)}</Grid>
      <Grid item style={{ color: '#AAAAAA' }}>
        {formatTime(date)}
      </Grid>
    </Grid>
  )
}

// TODO Make changes after complete backend api endpoints
export const columns: Array<TableColumn<any>> = [
  {
    key: 'date',
    label: 'Date',
    render: renderDateAndTimeField
  },
  {
    key: 'from',
    label: 'From'
  },
  {
    key: 'to',
    label: 'To'
  },
  {
    key: 'direction',
    label: 'Direction'
  },
  {
    key: 'typesOfTransfer',
    label: 'Types Of Transfer'
  },
  {
    key: 'amount',
    label: 'Amount',
    align: 'right',
    headAlign: 'right'
  }
]
