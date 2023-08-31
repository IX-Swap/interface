import { Box, Grid, Typography } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { DateFilter } from 'app/pages/admin/components/AssignedVirtualAccountsTable/DateFilter'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'

export const VAAuditFilters = () => {
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      container
      wrap={'wrap'}
      alignItems={'end'}
      justifyContent={'space-between'}
      p={3}
    >
      <Grid item xs={12} md={7}>
        <Typography style={{ fontWeight: 500, marginBottom: '10px' }}>
          Search
        </Typography>
        <TextInputSearchFilter
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
        <Grid item xs={12} md={5} mb={'5px'}>
          <DateFilter name='fromDate' label='From' width={'100%'} />
          {isMobile && <VSpacer size={'small'} />}
        </Grid>
        <Box pr={3} />
        <Grid item xs={12} md={5} mb={'5px'}>
          <DateFilter name='toDate' label='To' width={'100%'} />
        </Grid>
      </Grid>
    </Grid>
  )
}
