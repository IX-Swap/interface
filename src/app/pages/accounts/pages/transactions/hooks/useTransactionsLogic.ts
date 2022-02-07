import React, { useState } from 'react'
import { BaseFilter } from 'types/util'

export const initialTransactionFilter: BaseFilter = {
  status: '',
  asset: '5edf32d9748b763418db6a80',
  from: '',
  to: ''
}

export const useTransactionsLogic = () => {
  const [filter, setFilter] = useState<BaseFilter>(initialTransactionFilter)

  const handleAssetChange = (ev: React.ChangeEvent<{ value: unknown }>) => {
    setFilter({
      ...filter,
      asset: ev.target.value as string
    })
  }

  const handleDateChange = (name: 'to' | 'from', date: Date | null) => {
    const mFilter = { ...filter }
    mFilter[name] = date?.toISOString() ?? ''
    setFilter(mFilter)
  }

  return {
    filter,
    handleAssetChange,
    handleDateChange
  }
}
