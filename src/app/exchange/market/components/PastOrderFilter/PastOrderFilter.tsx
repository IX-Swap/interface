import React from 'react'
import { Grid, Box } from '@material-ui/core'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'

export const PastOrderFilter = () => {
  return (
    <SearchQueryFilterGroup>
      <Grid container spacing={1} wrap={'nowrap'}>
        <Grid item>
          <GroupedDateTimeFilter
            name='fromDate'
            groupFilter
            dateTimePickerProps={{
              label: 'From'
            }}
          />
        </Grid>
        <Grid item>
          <GroupedDateTimeFilter
            name='toDate'
            groupFilter
            dateTimePickerProps={{
              label: 'To'
            }}
          />
        </Grid>
        <Grid container item>
          <SearchQueryFilterGroupReset
            filters={['toDate', 'fromDate']}
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
            variant='outlined'
            disableElevation
          >
            Filter
          </SearchQueryFilterGroupApply>
        </Grid>
      </Grid>
    </SearchQueryFilterGroup>
  )
}
