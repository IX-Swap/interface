import React from 'react'
import { TableColumn } from 'types/util'
import format from 'date-fns/format'
import { Grid, Typography } from '@mui/material'
import { DSOActivity } from 'types/dso'
import { Avatar } from 'components/Avatar'
import { getActivityUserInfo } from 'app/pages/issuance/utils'

export const renderActivityDate = (date: string, row: DSOActivity) =>
  format(new Date(date), 'MM/dd/yyyy p')

export const renderActivityAvatar = (a: string, row: DSOActivity) => {
  const { imageId, name } = getActivityUserInfo(row)

  return (
    <Grid container alignItems='center' spacing={2}>
      <Grid item>
        <Avatar documentId={imageId} ownerId={row.user} size={36} />
      </Grid>
      <Grid item>
        <Typography variant='h5' style={{ fontSize: '0.875rem' }}>
          {name}
        </Typography>
      </Grid>
    </Grid>
  )
}

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
    render: renderActivityAvatar
  },
  {
    key: 'dso.tokenSymbol',
    label: 'Activity',
    render: renderActivity
  }
]

export default columns
