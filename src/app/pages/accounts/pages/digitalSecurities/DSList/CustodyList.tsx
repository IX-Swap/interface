import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import { custodyColumns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import React from 'react'

export const CustodyList = () => {
  const { data, isLoading } = useGetCustody()

  return (
    <TableView
      fakeItems={data}
      fakeLoading={isLoading}
      columns={custodyColumns}
      queryEnabled={false}
      paperProps={{
        style: {
          borderTop: 'none'
        }
      }}
    />
  )
}
