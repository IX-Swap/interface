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
  <AuthorizableStatus status={s} isNewTheme compact={false} />
)

export const renderDealStatus = (status: string): JSX.Element => {
  return <AuthorizableStatus status={status} isNewTheme compact={false} />
}

export const statusColumn: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: 'Submitted'
}
