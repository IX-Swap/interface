import React, { useRef } from 'react'
import { TableView } from 'components/TableWithPagination/TableView'
import columns from 'app/pages/admin/columns'
import User from 'types/user'
import { Actions } from 'app/pages/admin/components/Actions'
import { usersQueryKeys } from 'config/queryKeys'
import { userURL } from 'config/apiURL'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { Grid } from '@mui/material'
import { SearchFilter } from 'app/components/SearchFilter'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const Users = () => {
  const { getFilterValue } = useQueryFilter()
  useSetPageTitle('User Roles')

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='Users' />
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <SearchFilter
          fullWidth
          placeholder='Search'
          inputAdornmentPosition='end'
        />
      </Grid>
      <Grid item>
        <TableView<User>
          innerRef={ref}
          uri={userURL.getAll}
          name={usersQueryKeys.getList}
          columns={columns}
          hasActions
          actions={({ item }) => renderActions(item, ref)}
          filter={filter}
          actionHeader='Roles'
        />
      </Grid>
    </Grid>
  )
}

export const renderActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)
