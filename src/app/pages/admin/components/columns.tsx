import React from 'react'
import { TableColumn } from 'types/util'
import { LoginHistory } from 'types/user'
import { Grid, Link, Typography, Tooltip } from '@material-ui/core'
import { getTimeFromNow } from 'helpers/dates'
import { Launch } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'

const UserAgentTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.backgrounds.default,
    maxWidth: 480,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${theme.palette.divider}`
  }
}))(Tooltip)

const renderTime = (time: string) => (
  <Typography noWrap>{getTimeFromNow(new Date(time))}</Typography>
)

const renderIp = (ip: string, loginHistory: LoginHistory) => (
  <Link href={loginHistory.geolocation.whois} target='_blank'>
    <Grid container justifyContent='space-between'>
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
  <UserAgentTooltip title={userAgent} placement='bottom-start'>
    <Typography noWrap align='justify' style={{ maxWidth: 480 }}>
      {userAgent}
    </Typography>
  </UserAgentTooltip>
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
