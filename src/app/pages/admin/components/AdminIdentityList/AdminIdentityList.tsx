import React from 'react'
import { columns } from 'app/pages/admin/components/AdminIdentityList/columns'
import { TableView } from 'components/TableWithPagination/TableView'
import { identityURL } from 'config/apiURL'
import { identityQueryKeys } from 'config/queryKeys'
import { AdminIdentity } from 'types/adminIdentity'
import { ViewIdentityAction } from 'app/pages/admin/components/AdminIdentityList/ViewIdentityAction'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Grid } from '@mui/material'
import { Filters } from 'app/pages/admin/components/AdminIdentityList/Filters'

export const AdminIdentityList = () => {
  const { getFilterValue } = useQueryFilter()

  const filter = {
    search: getFilterValue('search'),
    type: getFilterValue('identityType'),
    createdByAdmin: getFilterValue('createdByAdmin') === 'true'
  }

  return (
    <Grid container direction='column' spacing={2}>
      <Grid item>
        <Filters />
      </Grid>
      <Grid item>
        <TableView<AdminIdentity>
          uri={identityURL.stats.list}
          name={identityQueryKeys.getAdminIdentityList}
          columns={columns}
          hasActions
          actions={({ item }) => (
            <ViewIdentityAction
              identityType={item.type}
              identityId={item._id}
              userId={item.user._id}
            />
          )}
          filter={filter}
        />
      </Grid>
    </Grid>
  )
}
