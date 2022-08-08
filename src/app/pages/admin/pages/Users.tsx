import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import columns from 'app/pages/admin/columns'
import { Actions } from 'app/pages/admin/components/Actions'
import { TableView } from 'components/TableWithPagination/TableView'
import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useRef } from 'react'
import User from 'types/user'
import { RootContainer } from 'ui/RootContainer'

export const Users = () => {
  const { getFilterValue } = useQueryFilter()
  useSetPageTitle('User Roles')

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }

  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Users' />
      </Grid>
      <RootContainer>
        <Grid container direction='column' spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <TextInputSearchFilter
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
      </RootContainer>
    </Grid>
  )
}

export const renderActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)
