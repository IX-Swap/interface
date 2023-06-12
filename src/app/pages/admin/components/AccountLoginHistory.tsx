import { Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { columns } from 'app/pages/admin/components/columns'
import { TableView } from 'ui/UIKit/TablesKit/components/TableView/TableView'
import { authURL } from 'config/apiURL'
import { authQueryKeys } from 'config/queryKeys'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { LoginHistory } from 'types/user'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { useStyles } from './UserDetails.styles'

export const AccountLoginHistory = () => {
  const { userId } = useParams<{ userId: string }>()
  const { getFilterValue } = useQueryFilter()

  const ref = useRef(null)
  const filter = {
    search: getFilterValue('search')
  }
  const classes = useStyles()
  const { searchStyle } = classes

  return (
    <Grid container spacing={3} direction='column'>
      <Grid>
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
              <TableView<LoginHistory>
                innerRef={ref}
                uri={authURL.getLoginHistory(userId)}
                name={authQueryKeys.getLoginHistory(userId)}
                columns={columns}
                filter={filter}
              />
            </Grid>
          </Grid>
        </SearchQueryFilterGroup>
      </Grid>
      {/* <Grid item xs={12} md={4}>
        <TextInputSearchFilter
          fullWidth
          inputAdornmentPosition='end'
          placeholder='Search'
        />
      </Grid>
      <Grid item>
        <TableView<LoginHistory>
          innerRef={ref}
          uri={authURL.getLoginHistory(userId)}
          name={authQueryKeys.getLoginHistory(userId)}
          columns={columns}
          filter={filter}
        />
      </Grid> */}
    </Grid>
  )
}
