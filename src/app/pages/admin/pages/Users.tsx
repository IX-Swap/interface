import { Grid, Button } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import columns from 'app/pages/admin/columns'
import { Actions } from 'app/pages/admin/components/Actions'
import {
  TableView,
  TableViewRendererProps
} from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { userURL } from 'config/apiURL'
import { usersQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useRef, useContext } from 'react'
import User from 'types/user'
import { RootContainer } from 'ui/RootContainer'
import { SearchQueryFilterGroupDispatchContext } from 'components/SearchQueryFilter/SearchQueryFilterGroup/context'

export const Users = () => {
  const { getFilterValue, removeFilters } = useQueryFilter()
  const filterGroupDispatch = useContext(SearchQueryFilterGroupDispatchContext)
  useSetPageTitle('User Roles')

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }

  const resetFilterState = () => {
    // filterGroupDispatch({
    //   type: 'clear-all'
    // })

    removeFilters([])
  }

  return (
    <Grid container direction='column' spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Users' />
      </Grid>
      <RootContainer>
        <Grid container direction='column'>
          <Grid
            style={{
              display: 'flex',
              padding: '20px',
              background: 'white',
              marginBottom: '10px'
            }}
            gap={3}
          >
            <Grid xs={11}>
              <TextInputSearchFilter
                fullWidth
                placeholder='Search'
                inputAdornmentPosition='start'
              />
            </Grid>
            <Grid xs={1}>
              <Button
                variant='outlined'
                size='small'
                disableElevation
                style={{ height: '52px' }}
                onClick={resetFilterState}
              >
                Reset
              </Button>
              {/* <SearchQueryFilterGroupReset
                filters={['search']}
                variant='outlined'
                size='small'
                disableElevation
                style={{ height: '52px' }}
              >
                Reset
              </SearchQueryFilterGroupReset> */}
            </Grid>
          </Grid>
          <Grid item>
            <TableView<User>
              innerRef={ref}
              uri={userURL.getAll}
              name={usersQueryKeys.getList}
              columns={columns}
              actions={({ item }) => (
                renderActions(item, ref), renderUserActions(item, ref)
              )}
              filter={filter}
              actionHeader='Inverstor Roles'
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

export const renderUserActions = (item: User, ref: any) => (
  <Actions user={item} ref={ref} />
)
