import { Grid } from '@material-ui/core'
import { columns } from 'app/pages/educationCentre/components/AccessReports/columns'
import { ReportTypeFilter } from 'app/pages/educationCentre/components/AccessReports/ReportTypeFilter'
import { TableView } from 'components/TableWithPagination/TableView'
import { homeURL } from 'config/apiURL'
import { homeQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export const Reports = () => {
  const { getFilterValue } = useQueryFilter()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ReportTypeFilter />
      </Grid>
      <Grid item xs={12}>
        <TableView
          name={homeQueryKeys.getAtlasOneAccessReports}
          uri={homeURL.getAtlasOneAccessReports}
          paperProps={{
            variant: 'elevation',
            elevation: 0
          }}
          filter={{
            reportType: getFilterValue('reportType')
          }}
          noHeader
          themeVariant={'default'}
          bordered={false}
          columns={columns}
        />
      </Grid>
    </Grid>
  )
}
