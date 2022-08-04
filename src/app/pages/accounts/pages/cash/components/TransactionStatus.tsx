import { Typography } from '@mui/material'
import { capitalizeFirstLetter } from 'helpers/strings'
import React from 'react'
import { useStyles } from 'app/pages/accounts/pages/cash/components/TransactionStatus.styles'

export const TransactionStatus = ({
  status
}: {
  status: 'COMPLETED' | 'REJECTED' | 'PENDING'
}) => {
  const classes = useStyles({ type: status })
  return (
    <Typography className={classes.text}>
      {capitalizeFirstLetter(status)}
    </Typography>
  )
}
