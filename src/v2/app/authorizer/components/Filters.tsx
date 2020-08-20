import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { BaseFilter } from 'v2/types/util'
import { StatusFilter } from 'v2/app/authorizer/components/StatusFilter'
import { SearchAndDateFilter } from 'v2/app/authorizer/components/SearchAndDateFilter'

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

const useStyles = makeStyles(() => ({
  filtersLabel: {
    color: '#999999',
    fontSize: '1rem',
    fontWeight: 900
  },
  spaced: {
    paddingLeft: '24px!important',
    paddingRight: '24px!important'
  }
}))
