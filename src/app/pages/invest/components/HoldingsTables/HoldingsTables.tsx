import { TableTabsView } from 'app/components/TableTabsView/TableTabsView'
import { TradeHistoryTable } from 'app/pages/invest/components/TradeHistoryTable/TradeHistoryTable'
import { YourOrdersTable } from 'app/pages/invest/components/YourOrdersTable/YourOrderstable'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export const HoldingsTables = () => {
  const tabs = [
    {
      panel: 'Current Holdings Table',
      label: 'Current Holdings'
    },
    {
      panel: <TradeHistoryTable />,
      label: 'Trade History Table'
    },
    {
      panel: <YourOrdersTable />,
      label: 'Your Orders Table'
    }
  ]

  const { removeFilters } = useQueryFilter()

  const clearQuery = () => {
    removeFilters(['search', 'toDate', 'fromDate', 'pair'])
  }

  return <TableTabsView tabs={tabs} onChange={clearQuery} />
}
