import { BaseFilter, TableColumn } from 'v2/types/util'
import React, { useState } from 'react'
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

interface UseAuthorizerViewArgs<T> {
  idKey?: string
  uri: string
  columns: Array<TableColumn<T>>
}

export const renderStatusColumn = (s: string): JSX.Element => (
  <AuthorizableStatus status={s} />
)

export const statusColumn = {
  key: 'status',
  label: 'Status',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: ''
}

export const useAuthorizerView = <T,>(
  args: UseAuthorizerViewArgs<T>
): AuthorizerViewReturnValue<T> => {
  const { columns } = args
  const [item, setItem] = useState<T | undefined>(undefined)
  const [isViewing, setIsViewing] = useState(false)
  const [filter, setFilter] = useState<BaseFilter>(initialFilterValue)

  const _setFilter = (filterPart: Partial<BaseFilter>): void => {
    setFilter(f => ({ ...f, ...filterPart }))
  }

  const _setItem = (row?: T): void => {
    setItem(row)
    setIsViewing(row !== undefined)
  }

  const onBack = (): void => {
    setIsViewing(false)
  }

  const getColumns = (): Array<TableColumn<T>> => {
    return filter.status === '' ? [...columns, statusColumn] : columns
  }

  return {
    setItem: _setItem,
    setFilter: _setFilter,
    item,
    isViewing,
    filter,
    getColumns,
    onBack
  }
}
