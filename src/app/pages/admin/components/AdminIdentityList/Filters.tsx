import { Grid, Box } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { CreatedByAdminFilter } from 'app/pages/admin/components/AdminIdentityList/CreatedByAdminFilter/CreatedByAdminFilter'
import { IdentityTypeFilter } from 'app/pages/admin/components/AdminIdentityList/IdentityTypeFilter/IdentityTypeFilter'
import React from 'react'

export const Filters = () => {
  return (
    <Grid container justify='space-between'>
      <Grid item xs={12} md={4}>
        <Box width={316}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdornmentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box display='flex' justifyContent='flex-end'>
          <IdentityTypeFilter />
          <Box paddingLeft={2} />
          <CreatedByAdminFilter />
        </Box>
      </Grid>
    </Grid>
  )
}
