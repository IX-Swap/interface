import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { SearchFilter } from 'app/components/SearchFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const CustodySearchFilter = () => {
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <Grid item md={5} xs={12}>
      <SearchFilter
        fullWidth
        placeholder='Search'
        inputAdornmentPosition='start'
      />
      {(isMobile || isTablet) && <VSpacer size={'small'} />}
      {(isMobile || isTablet) && <VSpacer size={'extraSmall'} />}
    </Grid>
  )
}
