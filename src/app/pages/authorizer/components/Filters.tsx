import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { BaseFilter } from 'types/util'
import { StatusFilter } from 'app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'app/pages/authorizer/components/SearchAndDateFilter'
import { useQueryCache } from 'react-query'

export const Filters = () => {
  const queryCache = useQueryCache()
  const onApplyFilter = (filterPart: Partial<BaseFilter>) => {
    queryCache.setQueryData<BaseFilter>('authorizerFilter', filter => ({
      ...filter,
      ...filterPart
    }))
    // TODO: invalidate only current table
    void queryCache.invalidateQueries()
    void queryCache.refetchQueries()
  }

  return (
    <Grid container spacing={3} style={{ paddingTop: 70 }}>
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
