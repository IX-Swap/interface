import React from 'react'
import { Grid, Box } from '@mui/material'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { GroupedSearchFilter } from 'app/pages/authorizer/components/GroupedSearchFilter'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { useAuthorizerCategory } from 'hooks/location/useAuthorizerCategory'
import { ClosedDSOsFilter } from 'app/pages/authorizer/components/ClosedDSOFilter'

export const SearchAndDateFilter = () => {
  const category = useAuthorizerCategory()
  const isCommitments = category === 'commitments'
  return (
    <SearchQueryFilterGroup>
      <Grid container direction='column' spacing={3} style={{ paddingTop: 24 }}>
        {isCommitments && (
          <Grid item xs={12}>
            <ClosedDSOsFilter />
          </Grid>
        )}
        <Grid item xs={12}>
          <GroupedSearchFilter isCommitment={isCommitments} />
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
        <Grid container item xs={12} justifyContent='flex-end'>
          <SearchQueryFilterGroupReset
            filters={['search', 'toDate', 'fromDate']}
            variant='contained'
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
            variant='contained'
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
