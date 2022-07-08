import { Box, Grid } from '@mui/material'
import { SearchFilter } from 'app/components/SearchFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { useStyles } from './BaseFilters.styles'

export const BaseFilters = ({
  children,
  searchLabel = 'Search'
}: PropsWithChildren<{ searchLabel?: string }>) => {
  const classes = useStyles()
  return (
    <Grid container justifyContent='space-between' className={classes.wrapper}>
      <Grid item xs={12} lg={2}>
        <Box className={classes.searchWrapper}>
          <SearchFilter
            fullWidth
            placeholder={searchLabel}
            inputAdornmentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} lg={10} className={classes.filterWrapper}>
        <Grid
          container
          direction='row'
          className={classes.childrenWRapper}
          spacing={2}
          alignItems='center'
        >
          <Grid item>
            <DateFilter name='fromDate' label='From' width={155} />
          </Grid>
          <Grid item>
            <DateFilter name='toDate' label='To' width={155} />
          </Grid>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}
