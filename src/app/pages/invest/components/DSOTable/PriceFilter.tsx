import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'

export const PriceFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('isPriceAscending')

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    if (value === '') {
      removeFilter('isPriceAscending')
    } else {
      updateFilter('isPriceAscending', event.target.value)
    }
  }

  return (
    <RadioGroup
      name={'currency'}
      value={value}
      onChange={event => handleChange(event)}
    >
      <Grid container alignItems={'center'} direction={'row'}>
        <Grid item>
          <FormControlLabel
            label='Low - High'
            value='yes'
            control={<Radio />}
          />
        </Grid>
        <Grid item>
          <FormControlLabel label='High - Low' value='no' control={<Radio />} />
        </Grid>
      </Grid>
    </RadioGroup>
  )
}
