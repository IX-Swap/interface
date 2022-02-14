import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import { useStyles } from './CustodyDatesFilter.styles'

export const CustodyDatesFilter = () => {
  const classes = useStyles()

  return (
    <Grid
      item
      container
      xs={12}
      md={4}
      justifyContent={'flex-start'}
      alignItems={'center'}
      wrap={'wrap'}
    >
      <Grid item xs={12} sm={'auto'} className={classes.firstItem}>
        <Typography className={classes.text}>Date:</Typography>
      </Grid>
      <Grid item xs={12} sm={true} className={classes.secondItem}>
        <DateFilter name='fromDate' label='From' width={'100%'} />
      </Grid>
      <Grid item xs={12} sm={true}>
        <DateFilter name='toDate' label='To' width={'100%'} />
      </Grid>
    </Grid>
  )
}
