import { BaseFilter, TableColumn } from 'v2/types/util'
import React, { useState, useEffect } from 'react'
import { useAuthorizerTableStore } from 'v2/app/authorizer/context'
import { StatusColumn } from 'v2/app/authorizer/components/StatusColumn'

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
  <StatusColumn status={s} />
)

export const statusColumn = {
  key: 'status',
  label: '',
  render: renderStatusColumn
}

export const initialFilterValue: BaseFilter = {
  status: ''
}

export const useAuthorizerView = <T,>(
  args: UseAuthorizerViewArgs<T>
): AuthorizerViewReturnValue<T> => {
  const { setUri, setIdKey } = useAuthorizerTableStore()
  const { idKey, uri, columns } = args
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
    return filter.status === 'Submitted' ? [...columns, statusColumn] : columns
  }

  useEffect(() => {
    setIdKey(idKey)
    setUri(uri)
  }, [idKey, uri, setIdKey, setUri])

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
