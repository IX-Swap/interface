import React from 'react'
import { NoData } from 'app/pages/issuance/components/FinancialReportsTable/NoData'
import { TableView } from 'components/TableWithPagination/TableView'
import { columns } from 'app/pages/issuance/components/FinancialReportsTable/columns'
import { FinancialReport } from 'types/financitalReport'
import { Actions } from 'app/pages/issuance/components/FinancialReportsTable/Actions'

export const FinancialReportsTable = () => {
  return (
    <TableView<FinancialReport>
      name='financial-reports'
      uri='/issuance/financial-report-file/list'
      columns={columns}
      noDataComponent={<NoData />}
      hasActions
      actions={Actions}
    />
  )
}
