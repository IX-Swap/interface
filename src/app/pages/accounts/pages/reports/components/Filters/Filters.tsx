import React from 'react'
import { Box, Typography } from '@mui/material'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import { useStyles } from 'app/pages/accounts/pages/reports/components/Filters/Filter.styles'

export const Filters: React.FC = () => {
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <Typography variant={'subtitle1'} className={classes.filterText}>
        Select Date:
      </Typography>
      <Box className={classes.filtersWrapper}>
        <Box className={classes.filterWrapper}>
          <DateFilter name={'fromDate'} label={'From'} />
        </Box>

        <Box className={classes.filterWrapper}>
          <DateFilter name={'toDate'} label={'To'} />
        </Box>
      </Box>
    </Box>
  )
}
