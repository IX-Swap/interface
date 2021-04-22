import { Box, Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import React from 'react'

export const Filters = () => {
  return (
    <Grid container justify='space-between'>
      <Grid item xs={12} md={6}>
        <Box width={300}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            inputAdormentPosition='end'
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}></Grid>
    </Grid>
  )
}
