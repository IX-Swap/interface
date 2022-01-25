import React from 'react'
import { TableColumn } from 'types/util'
import User from 'types/user'
import {
  BooleanColumn,
  ColorType
} from 'app/pages/admin/components/BooleanColumn'
import { ViewUserColumn } from 'app/pages/admin/components/ViewUserColumn'
import { format } from 'date-fns'

export const renderViewUser = (id: string) => <ViewUserColumn userId={id} />

export const renderBoolean = (
  a: boolean,
  labels?: [string, string],
  colors?: [ColorType, ColorType]
) => <BooleanColumn value={a} labels={labels} colors={colors} />

export const columns: Array<TableColumn<User>> = [
  {
    key: 'createdAt',
    label: 'Account creation date',
    render: (a: string) => format(new Date(a), 'MM/dd/yyyy')
  },
  {
    key: 'email',
    label: 'Email'
  },
  {
    key: '_id',
    label: '',
    render: renderViewUser
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'enabled',
    label: 'Status',
    render: (a: boolean) => renderBoolean(a, ['Enabled', 'Disabled'])
  },
  {
    key: 'twoFactorAuth',
    label: '2FA',
    render: (a: boolean) =>
      renderBoolean(a, ['Enabled', 'Pending'], ['textPrimary', 'primary'])
  },
  {
    key: 'verified',
    label: 'Verification',
    render: (a: boolean) => renderBoolean(a, ['Verified', 'Email Sent'])
  }
]

export default columns
