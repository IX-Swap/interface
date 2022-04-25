import { TableTabsView } from 'app/components/TableTabsView/TableTabsView'
import { CurrentHoldingsTable } from 'app/pages/accounts/components/CurrentHoldingsTable/CurrentHoldingsTable'
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

export const HoldingsTables = ({ setHeaderContent }: HoldingsTablesProps) => {
  const tabs = [
    {
      panel: <CurrentHoldingsTable />,
      label: 'Current Holdings',
      headerTitle: 'Holdings',
      description:
        'View, manage and track the value of your private company shares and stock options over time. Receive insights, and investment and liquidity opportunities specific to your holdings.'
    },
    {
      panel: <TradeHistoryTable />,
      label: 'Trade History',
      headerTitle: 'Trades',
      description:
        'View, manage and filter all the transactions you have made on the secondary market.'
    },
    {
      panel: <YourOrdersTable />,
      label: 'Orders',
      headerTitle: 'Orders',
      description:
        'View, manage and track the number of orders open on your order book.'
    }
  ]

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
