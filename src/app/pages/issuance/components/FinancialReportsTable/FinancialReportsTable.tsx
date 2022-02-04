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
      columns={columns}
      noDataComponent={<NoData />}
      hasActions
      actions={Actions}
      fakeItems={[
        {
          _id: '1',
          creationDate: '12/29/2021',
          reportInterval: '12/29/2021 - 02/28/2022',
          type: 'PDF',
          reportOf: 'Hamilton Token',
          documentId: '619752bb43bb8622657c5f14'
        }
      ]}
    />
  )
}
