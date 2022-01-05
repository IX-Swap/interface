import { Box, Grid, Typography } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import React, { PropsWithChildren } from 'react'
import { useStyles } from './BaseFilters.styles'

export const BaseFilters = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles()
  return (
    <Grid container justifyContent='space-between' className={classes.wrapper}>
      <Grid item xs={12} md={6}>
        <Box className={classes.searchWrapper}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdornmentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction='row'
          justifyContent='flex-end'
          spacing={2}
          alignItems='center'
        >
          <Grid item>
            <Typography>Date:</Typography>
          </Grid>
          <Grid item>
            <DateFilter name='fromDate' label='From' />
          </Grid>
          <Grid item>
            <DateFilter name='toDate' label='To' />
          </Grid>
          {children}
        </Grid>
      </Grid>
    </Grid>
  )
}
