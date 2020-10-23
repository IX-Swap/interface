import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { BaseFilter } from 'v2/types/util'
import { StatusFilter } from 'v2/app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'v2/app/pages/authorizer/components/SearchAndDateFilter'
import { queryCache } from 'react-query'

export const Filters = () => {
  const onApplyFilter = (filterPart: Partial<BaseFilter>) => {
    queryCache.setQueryData<BaseFilter>('authorizerFilter', filter => ({
      ...filter,
      ...filterPart
    }))
    // TODO: invalidate only current table
    void queryCache.invalidateQueries()
  }

  return (
    <Grid container spacing={2} style={{ paddingTop: 70 }}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='h6'>FILTERS</Typography>
      </Grid>
      <Grid item xs={12}>
        <StatusFilter onChange={onApplyFilter} />
      </Grid>
      <SearchAndDateFilter onApplyFilter={onApplyFilter} />
    </Grid>
  )
}
