import { BaseFilter, TableColumn } from 'types/util'
import React from 'react'
import { AuthorizableStatus } from 'app/pages/authorizer/components/AuthorizableStatus'

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
  <AuthorizableStatus status={s} />
)

export const renderDSOStatusColumn = (s: string): JSX.Element => {
  let dsoStatus = s
  switch (s) {
    case 'Approved':
      dsoStatus = 'Active'
      break

    default:
      dsoStatus = s
      break
  }
  return <AuthorizableStatus status={dsoStatus} isNewTheme compact={false} />
}

export const statusColumn: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: 'Submitted'
}
