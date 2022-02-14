import { Box, Grid, Typography } from '@material-ui/core'
import React from 'react'
import { SearchFilter } from 'app/components/SearchFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const VAAuditFilters = () => {
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      wrap={'wrap'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Grid item md={7} xs={12}>
        <SearchFilter
          fullWidth
          placeholder='Search'
          inputAdornmentPosition='start'
        />
        {(isMobile || isTablet) && <VSpacer size={'small'} />}
      </Grid>

      <Grid
        item
        container
        xs={12}
        md={5}
        justifyContent={isMobile ? 'space-between' : 'flex-end'}
        alignItems={'center'}
        wrap={'wrap'}
      >
        <Grid item xs={12} sm={'auto'}>
          <Typography style={{ fontWeight: 600 }}>Date:</Typography>
          {isMobile && <VSpacer size={'small'} />}
        </Grid>
        <Box pr={1} />
        <Grid item xs={12} sm={true} md={4}>
          <DateFilter name='fromDate' label='From' width={'100%'} />
          {isMobile && <VSpacer size={'small'} />}
        </Grid>
        <Box pr={3} />
        <Grid item xs={12} sm={true} md={4}>
          <DateFilter name='toDate' label='To' width={'100%'} />
        </Grid>
      </Grid>
    </Grid>
  )
}
