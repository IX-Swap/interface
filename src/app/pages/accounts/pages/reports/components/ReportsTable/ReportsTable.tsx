import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from './columns'
import { Actions } from './Actions'
import { ReportsRoute } from 'app/pages/accounts/pages/reports/router/config'
import { ReportsItem } from 'types/reports'

export const reportsItems: ReportsItem[] = [
  {
    name: 'Accounts Summary',
    type: 'HTML View',
    href: ReportsRoute.accountsSummary
  },
  {
    name: 'Trade Confirmation',
    type: 'HTML View',
    href: ReportsRoute.tradeConfirmation
  },
  {
    name: 'Aggregated Costs and Charges',
    type: 'HTML View',
    href: ReportsRoute.aggregateCostsAndCharges
  },
  { name: 'Dividends', type: 'HTML View', href: ReportsRoute.dividends }
]

export const ReportsTable: React.FC = () => {
  return (
    <TableView<ReportsItem>
      noHeader
      columns={columns}
      hasActions
      actions={Actions}
      fakeItems={reportsItems}
      themeVariant='primary'
    />
  )
}
