import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { FormControl, Grid, Typography } from '@mui/material'
import { VTDirectionSelect } from 'app/pages/admin/components/VTDirectionSelect'

export const VTDirectionFilter = () => {
  const { getFilterValue, updateFilter } = useQueryFilter()
  const value = getFilterValue('transferDirection')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    updateFilter('transferDirection', event.target.value)
  }

  return (
    <Grid item display={'flex'} flexDirection={'column'} gap={1}>
      <Typography>Direction</Typography>
      <FormControl variant='outlined' fullWidth>
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
