import { TableTabsView } from 'app/components/TableTabsView/TableTabsView'
import { TradeHistoryTable } from 'app/pages/invest/components/TradeHistoryTable/TradeHistoryTable'
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
      panel: 'Your Orders',
      label: 'Your Orders Table'
    }
  ]

  return <TableTabsView tabs={tabs} />
}
