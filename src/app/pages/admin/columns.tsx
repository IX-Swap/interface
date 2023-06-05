import React from 'react'
import { TableColumn } from 'types/util'
import User from 'types/user'
import {
  BooleanColumn,
  ColorType,
  TwoFaColumn,
  VerifierFaColumn
} from 'app/pages/admin/components/BooleanColumn'
import { ViewUserColumn } from 'app/pages/admin/components/ViewUserColumn'
import { formatDateToMMDDYY } from 'helpers/dates'
import { renderUserActions } from './pages/Users'

export const renderViewUser = (id: string) => <ViewUserColumn userId={id} />

export const renderidentity = (identity: any) => {
  const asArray = Object.entries(identity)
  const filtered = asArray.filter(([key, value]) => value === true)
  return filtered
}

export const renderBoolean = (
  a: boolean,
  labels?: [string, string],
  colors?: [ColorType, ColorType]
) => <BooleanColumn value={a} labels={labels} colors={colors} />

export const twoFa = (a: boolean) => <TwoFaColumn value={a} />

export const renderVerified = (a: boolean) => <VerifierFaColumn value={a} />

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
    render: (a: boolean) => twoFa(a)
  },
  {
    key: 'verified',
    label: 'Verification Status',
    render: (a: boolean) => renderVerified(a)
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
    key: 'identity',
    label: 'Investor Identity',
    render: (a: boolean) => renderidentity(a)
  },
  {
    key: 'declaredAsStatus',
    label: 'User Roles',
    render: (status, row) => renderUserActions(row, status)
  }
]

export default columns
