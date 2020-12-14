import React from 'react'
import { TableColumn } from 'types/util'
import format from 'date-fns/format'
import { Commitment } from 'types/commitment'
import { DSOLogo } from 'app/components/DSO/components/DSOLogo'
import { Grid, Typography } from '@material-ui/core'

export const renderActivityDate = (date: string, row: Commitment) =>
  format(new Date(date), 'MM/dd/yyyy p')

export const renderCommitmentAvatar = (a: string, row: Commitment) => (
  <Grid container alignItems='center' spacing={2}>
    <Grid item>
      <DSOLogo dsoId={row.dso._id} size={40} />
    </Grid>
    <Grid item>
      <Typography variant='h5' style={{ fontSize: '0.875rem' }}>
        {row.identity.individual.firstName +
          ' ' +
          row.identity.individual.lastName}
      </Typography>
    </Grid>
  </Grid>
)

export const renderActivity = () => (
  <Typography>{`Added a new commitment`}</Typography>
)

export const columns: Array<TableColumn<Commitment>> = [
  {
    key: 'createdAt',
    label: 'Date',
    render: renderActivityDate
  },
  {
    key: '_id',
    label: 'Name',
    render: renderCommitmentAvatar
  },
  {
    key: 'dso.tokenSymbol',
    label: 'Activity',
    render: renderActivity
  }
]

export default columns
