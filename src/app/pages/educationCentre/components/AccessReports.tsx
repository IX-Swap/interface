import React from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { getAccessReportsColumns } from './columns'

export interface AccessReportsProps {
  editable?: boolean
}

export const AccessReports = (props: AccessReportsProps) => {
  const { editable = false } = props

  return (
    <TableView
      name={homeQueryKeys.getAccessReports}
      uri={homeURL.getAccessReports}
      paperProps={{
        variant: 'elevation',
        elevation: 0
      }}
      bordered={false}
      columns={getAccessReportsColumns(editable)}
    />
  )
}
