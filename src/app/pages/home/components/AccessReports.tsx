import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { columns } from './columns'

export const AccessReports = () => {
  return (
    <TableView
      name={homeQueryKeys.getAccessReports}
      uri={homeURL.getAccessReports}
      paperProps={{
        variant: 'elevation',
        elevation: 0
      }}
      bordered={false}
      columns={columns}
    />
  )
}
