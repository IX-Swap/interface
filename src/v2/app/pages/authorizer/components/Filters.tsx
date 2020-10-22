import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './Filters.styles'
import { BaseFilter } from 'v2/types/util'
import { StatusFilter } from 'v2/app/pages/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'v2/app/pages/authorizer/components/SearchAndDateFilter'

export interface FiltersProps {
  onApplyFilter: (filters: Partial<BaseFilter>) => void
}

export const Filters: React.FC<FiltersProps> = ({ onApplyFilter }) => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} style={{ padding: '0 32px' }}>
        <Typography variant='button' className={classes.filtersLabel}>
          FILTERS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StatusFilter onChange={onApplyFilter} />
      </Grid>
      <SearchAndDateFilter onApplyFilter={onApplyFilter} />
    </Grid>
  )
}
