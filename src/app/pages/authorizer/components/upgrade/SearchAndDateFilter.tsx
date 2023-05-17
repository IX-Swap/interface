import React from 'react'
import { Grid, Box } from '@mui/material'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { GroupedSearchFilter } from 'app/pages/authorizer/components/GroupedSearchFilter'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
// import { ClosedDSOsFilter } from 'app/pages/authorizer/components/ClosedDSOFilter'

export const SearchAndDateFilter = () => {
  const category = useAuthorizerCategory()
  const isCommitments = category === 'commitments'
  return (
    <SearchQueryFilterGroup>
      <Grid container spacing={3}>
        {/* {isCommitments && (
          <Grid item xs={12}>
            <ClosedDSOsFilter />
          </Grid>
        )} */}
        <Grid item xs={2}>
          <GroupedDateTimeFilter
            name='fromDate'
            groupFilter
            dateTimePickerProps={
              {
                // label: 'From'
              }
            }
          />
        </Grid>
        <Grid item xs={2}>
          <GroupedDateTimeFilter
            name='toDate'
            groupFilter
            dateTimePickerProps={
              {
                // label: 'To'
              }
            }
          />
        </Grid>
        <Grid item xs={6}>
          <GroupedSearchFilter isCommitment={isCommitments} />
        </Grid>
        <Grid container style={{ height: 'fit-content' }} item xs={2}>
          <SearchQueryFilterGroupReset
            filters={['search', 'toDate', 'fromDate']}
            variant='outlined'
            size='small'
            disableElevation
            style={{ height: '52px' }}
          >
            Reset
          </SearchQueryFilterGroupReset>
          <Box mx={0.5} />
          <SearchQueryFilterGroupApply
            filters={['search', 'toDate', 'fromDate']}
            color='primary'
            variant='outlined'
            disableElevation
            style={{ height: '52px' }}
          >
            Submit
          </SearchQueryFilterGroupApply>
        </Grid>
      </Grid>
    </SearchQueryFilterGroup>
  )
}
