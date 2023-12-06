import { TableTabsView } from 'app/components/TableTabsView/TableTabsView'
import { TradeHistoryTable } from 'app/pages/accounts/components/TradeHistoryTable/TradeHistoryTable'
import { YourOrdersTable } from 'app/pages/accounts/components/YourOrdersTable/YourOrderstable'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export interface HoldingsTablesProps {
  setHeaderContent: ({
    title,
    subtitle
  }: {
    title: string
    subtitle: string
  }) => void
}

export const tabs = [
  {
    panel: <TradeHistoryTable />,
    label: 'Past Orders',
    headerTitle: 'Past Orders',
    description: 'View, manage, and filter all the transactions you have made.'
  },
  {
    panel: <YourOrdersTable />,
    label: 'Open Orders',
    headerTitle: 'Open Orders',
    description:
      'View, manage, and track the number of orders open on your order book.'
  }
]

export const HoldingsTables = ({ setHeaderContent }: HoldingsTablesProps) => {
  const { removeFilters } = useQueryFilter()

  const handleChange = (event: object, value: any) => {
    removeFilters(['search', 'toDate', 'fromDate', 'pair'])
    setHeaderContent({
      title: tabs[value].headerTitle,
      subtitle: tabs[value].description
    })
  }

  return <TableTabsView tabs={tabs} onChange={handleChange} />
}
