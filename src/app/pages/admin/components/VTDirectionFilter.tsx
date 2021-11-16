import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { FormControl, Grid, InputLabel } from '@material-ui/core'
import { VTDirectionSelect } from 'app/pages/admin/components/VTDirectionSelect'

export const VTDirectionFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const value = getFilterValue('transferDirection')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    updateFilter('transferDirection', event.target.value)
  }

  return (
    <Grid item xs={12} md={4} lg={true}>
      <FormControl variant='outlined' fullWidth>
        <InputLabel htmlFor='sortBy'>Sort By</InputLabel>
        <VTDirectionSelect
          includeAll
          valueBetweenAll={''}
          inputProps={{ id: 'sortBy', 'data-testid': 'select' }}
          value={value}
          onChange={handleChange}
        />
      </FormControl>
    </Grid>
  )
}
