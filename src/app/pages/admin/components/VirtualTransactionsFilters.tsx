import { Grid } from '@material-ui/core'
import React from 'react'
import { SearchFilter } from 'app/components/SearchFilter'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const VirtualTransactionsFilters = () => {
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <Grid item container wrap={'wrap'} direction={'column'}>
      <Grid item xs={12}>
        <SearchFilter
          fullWidth
          placeholder='Search virtual account/ SWIFT'
          inputAdormentPosition='start'
        />
        {(isMobile || isTablet) && <VSpacer size={'small'} />}
      </Grid>
    </Grid>
  )
}
