import { columns } from 'app/pages/home/components/AtlasOneReports/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import React from 'react'

export const AtlasOneReports = () => {
  return (
    <TableView
      name={homeQueryKeys.getAtlasOneAccessReports}
      uri={homeURL.getAtlasOneAccessReports}
      paperProps={{
        variant: 'elevation',
        elevation: 0
      }}
      noHeader
      themeVariant='default'
      bordered={false}
      columns={columns}
    />
  )
}
