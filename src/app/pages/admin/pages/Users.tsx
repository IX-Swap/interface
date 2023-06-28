import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import columns from 'app/pages/admin/columns'
// import { Actions } from 'app/pages/admin/components/Actions'
// import { RoleActions } from '../components/RoleActions'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useRef } from 'react'
import User from 'types/user'
import { RootContainer } from 'ui/RootContainer'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { useStyles } from '../components/UserDetails.styles'
// import { RoleActions } from '../components/RoleActions'
export const Users = () => {
  const { getFilterValue } = useQueryFilter()
  useSetPageTitle('User Roles')

  const ref = useRef(null)

  const filter = {
    search: getFilterValue('search')
  }
  const classes = useStyles()
  const { searchStyle } = classes

  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Users' />
      </Grid>
      <RootContainer>
        <SearchQueryFilterGroup>
          <Grid container direction='column'>
            <Grid className={searchStyle} gap={3}>
              <Grid xs={11}>
                <TextInputSearchFilter
                  fullWidth
                  placeholder='Search'
                  inputAdornmentPosition='start'
                />
              </Grid>
              <Grid>
                <SearchQueryFilterGroupReset
                  filters={['search']}
                  variant='outlined'
                  size='small'
                  disableElevation
                  style={{ height: '52px' }}
                  pageType={'user'}
                >
                  Reset
                </SearchQueryFilterGroupReset>
              </Grid>
            </Grid>
            <Grid item>
              <TableView<User>
                innerRef={ref}
                uri={userURL.getAll}
                name={usersQueryKeys.getList}
                columns={columns}
                // actions={({ item }) => renderActions(item, ref)}
                filter={filter}
                // actionHeader='User Roles'
              />
            </Grid>
          </Grid>
        </SearchQueryFilterGroup>
      </RootContainer>
    </Grid>
  )
}

// export const renderActions = (item: User, ref: any) => (
//   <Actions user={item} ref={ref} />
// )
