import { BaseFilter, TableColumn } from 'types/util'
import React from 'react'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'
import { Box } from '@mui/material'
import { Status } from 'ui/Status/Status'
import { Actions } from 'app/pages/authorizer/components/Actions'
import { capitalizeFirstLetter } from 'helpers/strings'

export interface AuthorizerViewReturnValue<T> {
  item: T | undefined
  isViewing: boolean
  filter: BaseFilter
  setFilter: (filter: Partial<BaseFilter>) => void
  setItem: (item?: T) => void
  getColumns: () => Array<TableColumn<T>>
  onBack: () => void
}

export const renderStatusColumn = (s: string): JSX.Element => (
  <AuthorizableStatus status={s} isNewTheme compact={false} />
)

export const renderStatus = (s: string): JSX.Element => (
  <Status label={capitalizeFirstLetter(s)} type={s.toLowerCase()} />
)

export const renderStatusColumnWithApproval = (row: object, status: string) => {
  return (
    <Box display={'flex'} justifyContent={''}>
      <Status
        label={capitalizeFirstLetter(status)}
        type={status.toLowerCase()}
      />
      <Actions item={row} cacheQueryKey={''} />
    </Box>
  )
}

export const renderDealStatus = (status: string): JSX.Element => {
  // return <AuthorizableStatus status={status} isNewTheme compact={false} />
  return typeof status !== 'undefined' ? (
    <Status label={status} type={status.toLowerCase()} />
  ) : (
    <></>
  )
}

export const statusColumn: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: 'Submitted'
}

export const statusColumnWithActions: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: (status, row) => renderStatusColumnWithApproval(row, status)
}
