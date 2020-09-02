import React from 'react'
import { useStyles } from 'v2/app/pages/authorizer/components/styles'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'

interface StatusColumnProps {
  status: string
}

export const StatusColumn: React.FC<StatusColumnProps> = props => {
  const { status } = props
  const classes = useStyles()

  switch (status) {
    case 'Approved':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.approved)}
        >
          A
        </Typography>
      )
    case 'Rejected':
      return (
        <Typography
          className={classNames(classes.authStatus, classes.rejected)}
        >
          R
        </Typography>
      )
    default:
      return (
        <Typography
          className={classNames(classes.authStatus, classes.unauthorized)}
        >
          U
        </Typography>
      )
  }
}
