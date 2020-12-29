import React from 'react'
import { TableColumn } from 'types/util'
import format from 'date-fns/format'
import { Grid, Typography } from '@material-ui/core'
import { DSOActivity } from 'types/dso'
import { Avatar } from 'components/Avatar'

export const renderActivityDate = (date: string, row: DSOActivity) =>
  format(new Date(date), 'MM/dd/yyyy p')

export const renderCommitmentAvatar = (a: string, row: DSOActivity) => (
  <Grid container alignItems='center' spacing={2}>
    <Grid item>
      <Avatar
        documentId={row.identity.individual.photo}
        ownerId={row.identity.individual.photo}
        size={40}
      />
    </Grid>
    <Grid item>
      <Typography variant='h5' style={{ fontSize: '0.875rem' }}>
        {row.identity.individual.firstName} {row.identity.individual.lastName}
      </Typography>
    </Grid>
  </Grid>
)

export const renderActivity = (_: any, row: DSOActivity) => (
  <Typography>{row.invariant}</Typography>
)

export const columns: Array<TableColumn<DSOActivity>> = [
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
