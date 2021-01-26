import React from 'react'
import { TableColumn } from 'types/util'
import { LoginHistory } from 'types/user'
import { Grid, Link, Typography } from '@material-ui/core'
import { getTimeFromNow } from 'helpers/dates'
import { Launch } from '@material-ui/icons'

const renderTime = (time: string) => (
  <Typography noWrap>{getTimeFromNow(new Date(time))}</Typography>
)

const renderIp = (ip: string, loginHistory: LoginHistory) => (
  <Link href={loginHistory.geolocation.whois}>
    <Grid container justify='space-between'>
      <Typography noWrap>
        {`${ip} ( ${[
          loginHistory.geolocation.city,
          loginHistory.geolocation.country
        ].join(', ')} )`}
      </Typography>
      <Launch color='primary' />
    </Grid>
  </Link>
)

const renderUserAgent = (userAgent: string) => (
  <Typography noWrap align='justify' style={{ maxWidth: 480 }}>
    {userAgent}
  </Typography>
)

export const columns: Array<TableColumn<LoginHistory>> = [
  {
    key: '_id',
    label: 'Login Id'
  },
  {
    key: 'createdAt',
    label: 'Time',
    render: renderTime
  },
  {
    key: 'ip',
    label: 'IP Address',
    render: renderIp
  },
  {
    key: 'userAgent.name',
    label: 'User Agent',
    render: renderUserAgent
  }
]

export default columns
