import React from 'react'
import { Grid, Box } from '@material-ui/core'
import useStyles from './SearchAndDateFilter.styles'
import { SearchQueryFilterGroup } from 'components/SearchQueryFilter/SearchQueryFilterGroup/SearchQueryFilterGroup'
import { GroupedSearchFilter } from 'app/pages/authorizer/components/GroupedSearchFilter'
import { GroupedDateTimeFilter } from 'app/pages/authorizer/components/GroupedFromDateFilter'
import { SearchQueryFilterGroupApply } from 'components/SearchQueryFilter/SearchQueryFilterGroupApply'
import { SearchQueryFilterGroupReset } from 'components/SearchQueryFilter/SearchQueryFilterGroupReset'

export const SearchAndDateFilter = () => {
  const classes = useStyles()

  return (
    <SearchQueryFilterGroup>
      <Grid
        container
        direction='column'
        spacing={1}
        style={{ padding: '0 10px' }}
      >
        <Grid
          item
          xs={12}
          className={classes.spaced}
          style={{ paddingTop: 24 }}
        >
          <GroupedSearchFilter />
        </Grid>
        <Grid item xs={12} className={classes.spaced}>
          <GroupedDateTimeFilter
            name='fromDate'
            groupFilter
            dateTimePickerProps={{
              label: 'From'
            }}
          />
        </Grid>
        <Grid item xs={12} className={classes.spaced}>
          <GroupedDateTimeFilter
            name='toDate'
            groupFilter
            dateTimePickerProps={{
              label: 'To'
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justify='flex-end'
          className={classes.spaced}
        >
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
