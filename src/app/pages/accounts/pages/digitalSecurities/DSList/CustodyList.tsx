import React from 'react'
import { Box } from '@mui/material'
import { useGetCustody } from 'app/pages/accounts/hooks/useGetCustody'
import { custodyColumns } from 'app/pages/accounts/pages/digitalSecurities/DSList/columns'
// import { TableView } from 'components/TableWithPagination/TableView'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'

export const CustodyList = () => {
  const { data, isLoading } = useGetCustody()

  return (
    <Box mt={2}>
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
        showExport
        exportFileName='Current Holdings'
      />
    </Box>
  )
}
