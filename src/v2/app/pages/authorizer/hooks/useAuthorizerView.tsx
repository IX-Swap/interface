import { BaseFilter, TableColumn } from 'v2/types/util'
import React from 'react'
import { AuthorizableStatus } from 'v2/app/pages/authorizer/components/AuthorizableStatus'

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

export const statusColumn: TableColumn<any> = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: 'Submitted'
}
