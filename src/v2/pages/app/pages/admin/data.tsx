import React from 'react'
import { TableColumn } from '../../../../types/util'
import User from '../../../../types/user'
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
    label: '2-Factor Auth',
    render: (a: boolean) => (
      <Typography color={a ? 'primary' : 'error'}>
        {a ? 'Yes' : 'No'}
      </Typography>
    )
  }
]

export default columns
