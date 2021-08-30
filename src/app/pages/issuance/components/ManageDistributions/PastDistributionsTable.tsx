import { Grid, Typography } from '@material-ui/core'
import { TableView } from 'components/TableWithPagination/TableView'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderDistributionStatus } from 'helpers/rendering'
import React from 'react'

export const PastDistributionsTable = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant='h5'>Past Distribution</Typography>
      </Grid>
      <Grid item xs={12}>
        <TableView<any>
          uri={''}
          name={''}
          columns={[
            { label: 'Date', key: 'createdAt', render: formatDateToMMDDYY },
            { label: 'Amount Distributed', key: 'amount' },
            { label: 'Distributed Amount Per Token', key: 'amountPerToken' },
            { label: 'Status', key: 'status', render: renderDistributionStatus }
          ]}
          themeVariant='primary'
          fakeItems={[
            {
              createdAt: '2021-03-12T08:37:43.832Z',
              amount: 'SGD 3,125,612.00',
              amountPerToken: '1.50',
              status: 'approved'
            },
            {
              createdAt: '2021-03-11T08:37:43.832Z',
              amount: 'SGD 6,231,628.00',
              amountPerToken: '1.05',
              status: 'pending'
            },
            {
              createdAt: '2021-02-10T08:37:43.832Z',
              amount: 'SGD 3,125,612.00',
              amountPerToken: '1.50',
              status: 'rejected'
            },
            {
              createdAt: '2021-02-09T08:37:43.832Z',
              amount: 'SGD 1,980,000',
              amountPerToken: '2.50',
              status: 'rejected'
            },
            {
              createdAt: '2021-01-08T08:37:43.832Z',
              amount: 'SGD 1,050,000.00',
              amountPerToken: '2.00',
              status: 'complete'
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}
