import { Grid } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { FilterToggles } from 'app/pages/exchange/market/components/PairTable/PairTableFilter/FilterToggles'
import React from 'react'
import { useStyles } from 'app/pages/exchange/market/components/PairTable/PairTableFilter/PairTableFilter.styles'

export const PairTableFilter = () => {
  const { searchFilter } = useStyles()

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FilterToggles />
      </Grid>
      <Grid item>
        <SearchFilter
          fullWidth
          className={searchFilter}
          inputAdormentPosition='end'
          placeholder='Search'
        />
      </Grid>
    </Grid>
  )
}
