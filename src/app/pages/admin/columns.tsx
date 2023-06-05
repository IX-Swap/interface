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
// import { Actions } from 'app/pages/admin/components/Actions'
import { RoleActions } from './components/RoleActions'

// export const renderActions = (item: User, ref: any) => (
//   <Actions user={item} ref={ref} />
// )

export const renderUserActions = (item: User, ref: any) => (
  <RoleActions user={item} ref={ref} />
)

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
    label: 'Investor Role',
    render: (status, row) => renderUserActions(row, status)
  }
  // {
  //   key: 'declaredAsStatus',
  //   label: 'User Roles',
  //   render: (status, row) => renderActions(row, status)
  // },
]

export default columns
