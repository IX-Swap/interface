import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { GroupedSearchFilter } from 'app/pages/authorizer/components/GroupedSearchFilter'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'

export const SearchAndDateFilter = () => {
  return (
    <SearchQueryFilterGroup>
      <Grid container direction='column' spacing={1}>
        <Grid item xs={12} style={{ paddingTop: 24 }}>
          <GroupedSearchFilter />
        </Grid>
        <Grid item xs={12}>
          <GroupedDateTimeFilter
            name='fromDate'
            groupFilter
            dateTimePickerProps={{
              label: 'From'
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <GroupedDateTimeFilter
            name='toDate'
            groupFilter
            dateTimePickerProps={{
              label: 'To'
            }}
          />
        </Grid>
        <Grid container item xs={12} justify='flex-end'>
          <SearchQueryFilterGroupReset
            filters={['search', 'toDate', 'fromDate']}
            variant='contained'
            size='small'
            color='default'
            disableElevation
          >
            Reset
          </SearchQueryFilterGroupReset>
          <Box mx={0.5} />
          <SearchQueryFilterGroupApply
            color='primary'
            variant='contained'
            disableElevation
          >
            Submit
          </SearchQueryFilterGroupApply>
        </Grid>
      </Grid>
    </SearchQueryFilterGroup>
  )
}
