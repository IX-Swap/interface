import React from 'react'
import { Grid, Typography } from '@mui/material'
import { CustodianFilter } from 'app/pages/admin/components/CustodianFilter'
import { useStyles } from 'app/pages/admin/components/CustodiansFilter/CustodiansFilter.styles'

export const CustodiansFilter = () => {
  const classes = useStyles()

  return (
    <Grid
      item
      md={2}
      container
      alignItems={'center'}
      className={classes.wrapper}
    >
      <Grid item xs={'auto'} md={'auto'} className={classes.item}>
        <Typography className={classes.text}>Filter:</Typography>
      </Grid>
      <Grid item xs={'auto'} md={4} className={classes.item}>
        <CustodianFilter custodian={'HEX'} />
      </Grid>
      <Grid item xs={'auto'} md={4}>
        <CustodianFilter custodian={'InvestaX'} />
      </Grid>
    </Grid>
  )
}
