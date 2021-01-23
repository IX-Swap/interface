import React, { useRef } from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { authURL } from 'config/apiURL'
import { useAdminRouter } from 'app/pages/admin/router'
import { authQueryKeys } from 'config/queryKeys'
import { columns } from 'app/pages/admin/components/columns'
import { LoginHistory } from 'types/user'
import { Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'

export const AccountLoginHistory = () => {
  const {
    params: { userId }
  } = useAdminRouter()

  const { getFilterValue } = useQueryFilter()

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container spacing={3} direction='column'>
      <Grid item xs={12} md={4}>
        <SearchFilter fullWidth inputAdormentPosition='end' />
      </Grid>
      <Grid item>
        <TableView<LoginHistory>
          innerRef={ref}
          uri={authURL.getLoginHistory(userId)}
          name={authQueryKeys.getLoginHistory(userId)}
          columns={columns}
          filter={filter}
        />
      </Grid>
    </Grid>
  )
}
