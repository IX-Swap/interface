import { Grid } from '@mui/material'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { FilterToggles } from 'app/pages/invest/components/PairTable/PairTableFilter/FilterToggles'
import { useStyles } from 'app/pages/invest/components/PairTable/PairTableFilter/PairTableFilter.styles'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React from 'react'

export const PairTableFilter = () => {
  const { searchFilter } = useStyles()
  const { updateFilter, getFilterValue } = useQueryFilter()
  const pairFilter = getFilterValue('pairFilter')

  const onChange = (value: string) => {
    if (Boolean(pairFilter) && Boolean(value)) {
      updateFilter('pairFilter', '')
    }
  }

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <FilterToggles />
      </Grid>
      <Grid item>
        <TextInputSearchFilter
          fullWidth
          className={searchFilter}
          inputAdornmentPosition='end'
          placeholder='Search'
          onInputCb={onChange}
        />
      </Grid>
    </Grid>
  )
}