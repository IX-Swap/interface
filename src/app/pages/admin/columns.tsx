import React from 'react'
import { TableColumn } from 'types/util'
import User from 'types/user'
import {
  BooleanColumn,
  ColorType
} from 'app/pages/admin/components/BooleanColumn'
import { ViewUserColumn } from 'app/pages/admin/components/ViewUserColumn'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderActions, renderUserActions } from './pages/Users'

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
    render: (a: string) => formatDateToMMDDYY(a)
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
    label: '2FA Status',
    render: (a: boolean) =>
      renderBoolean(a, ['Enabled', 'Pending'], ['textPrimary', 'primary'])
  },
  {
    key: 'enabled',
    label: 'Verification Status',
    render: (a: boolean) => renderBoolean(a, ['Enabled', 'Disabled'])
  },
  {
    key: '_id',
    label: '',
    render: renderViewUser
  },
  // {
  //   key: ' Investor Identity',
  //   label: 'Verification',
  //   render: (a: boolean) => renderBoolean(a, ['Verified', 'Email Sent'])
  // },
  {
    key: '',
    label: 'Investor Identity',
    render: (a: boolean) => renderBoolean(a, ['Verified', 'Email Sent'])
  },
    {
      key: 'declaredAsStatus',
      label: 'User Roles',
      render: (status, row) => renderUserActions(row, status,)
    },
]

export default columns
