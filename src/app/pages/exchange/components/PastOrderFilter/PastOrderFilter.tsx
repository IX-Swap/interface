import React from 'react'
import { Box, Grid } from '@mui/material'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { AppRouterLink } from 'components/AppRouterLink'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'
import { OTCMarketRoute } from 'app/pages/exchange/router/config'

export const PastOrderFilter = () => {
  return (
    <SearchQueryFilterGroup>
      <Grid container spacing={1} wrap={'nowrap'} alignItems={'center'}>
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
            color='primary'
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
        <Grid item>
          <AppRouterLink
            style={{ whiteSpace: 'nowrap' }}
            to={`${OTCMarketRoute.holdings}?tab=1`}
            color='primary'
            underline='always'
            className={'link'}
            variant='body1'
            target={'_blank'}
          >
            View History
          </AppRouterLink>
        </Grid>
      </Grid>
    </SearchQueryFilterGroup>
  )
}
