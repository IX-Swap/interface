import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { CustodianFilter } from 'app/pages/admin/components/CustodianFilter'

export const CustodiansFilter = () => {
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <Grid
      item
      md={2}
      container
      alignItems={'center'}
      justify={isTablet ? 'flex-start' : 'space-between'}
    >
      <Grid item xs={'auto'} md={'auto'}>
        <Typography style={{ fontWeight: 600 }}>Filter:</Typography>
        {(isMobile || isTablet) && <VSpacer size={'small'} />}
      </Grid>
      {(isMobile || isTablet) && <Box pr={3} />}
      <Grid item xs={'auto'} md={4}>
        <CustodianFilter custodian={'HEX'} />
        {(isMobile || isTablet) && <VSpacer size={'small'} />}
      </Grid>
      {(isMobile || isTablet) && <Box pr={3} />}
      <Grid item xs={'auto'} md={4}>
        <CustodianFilter custodian={'InvestaX'} />
        {(isMobile || isTablet) && <VSpacer size={'small'} />}
      </Grid>
    </Grid>
  )
}
