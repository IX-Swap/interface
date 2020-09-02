import React from 'react'
import { TableColumn } from 'v2/types/util'
import User from 'v2/types/user'
import { Typography } from '@material-ui/core'

export const columns: Array<TableColumn<User>> = [
  {
    key: 'accountType',
    label: 'Account Type'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: 'twoFactorAuth',
    label: '2-Factor auth',
    render: (a: boolean) => (
      <Typography color={a ? 'primary' : 'error'}>
        {a ? 'Yes' : 'No'}
      </Typography>
    )
  }
]

export default columns
