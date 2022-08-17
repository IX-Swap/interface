import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { renderSelectItems } from 'helpers/rendering'
import { QueryFilter, useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent, useState } from 'react'
import { Select } from 'ui/Select/Select'

export const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    '& $notchedOutline': {
      borderColor: theme.palette.select.border
    }
  },
  focused: {},
  notchedOutline: {}
}))

export const OverviewPageFilters = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const selectOptions = ['All Markets', 'Primary', 'OTC', 'Secondary']
  const searchFilterValue = getFilterValue('search')
  const primaryOfferingFilterValue = getFilterValue('primaryOfferingSearch')
  const otcMarketFilterValue = getFilterValue('otcMarketSearch')
  const secondaryMarketFilterValue = getFilterValue('secondaryMarketSearch')
  const currentFilterValue =
    searchFilterValue ??
    primaryOfferingFilterValue ??
    otcMarketFilterValue ??
    secondaryMarketFilterValue

  const defaultSelectValue = () => {
    if (searchFilterValue !== undefined) {
      return 'All Markets'
    }
    if (primaryOfferingFilterValue !== undefined) {
      return 'Primary'
    }
    if (otcMarketFilterValue !== undefined) {
      return 'OTC'
    }
    if (secondaryMarketFilterValue !== undefined) {
      return 'Secondary'
    }

    return 'All Markets'
  }

  const defaultCurrentFilter = () => {
    if (searchFilterValue !== undefined) {
      return 'search'
    }
    if (primaryOfferingFilterValue !== undefined) {
      return 'primaryOfferingSearch'
    }
    if (otcMarketFilterValue !== undefined) {
      return 'otcMarketSearch'
    }
    if (secondaryMarketFilterValue !== undefined) {
      return 'secondaryMarketSearch'
    }
  }

  const [currentFilter, setCurrentFilter] = useState(defaultCurrentFilter())

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    switch (value) {
      case 'Primary':
        setCurrentFilter('primaryOfferingSearch')
        updateFilter('primaryOfferingSearch', currentFilterValue)
        removeFilter('search')
        removeFilter('otcMarketSearch')
        removeFilter('secondaryMarketSearch')
        break
      case 'OTC':
        setCurrentFilter('otcMarketSearch')
        updateFilter('otcMarketSearch', currentFilterValue)
        removeFilter('search')
        removeFilter('primaryOfferingSearch')
        removeFilter('secondaryMarketSearch')
        break
      case 'Secondary':
        setCurrentFilter('secondaryMarketSearch')
        updateFilter('secondaryMarketSearch', currentFilterValue)
        removeFilter('search')
        removeFilter('otcMarketSearch')
        removeFilter('primaryOfferingSearch')
        break
      default:
        setCurrentFilter('search')
        updateFilter('search', currentFilterValue)
        removeFilter('primaryOfferingSearch')
        removeFilter('otcMarketSearch')
        removeFilter('secondaryMarketSearch')
        break
    }
  }

  return (
    <Grid container sx={{ flexDirection: { xs: 'column', md: 'row' } }}>
      <Grid item>
        <Select
          fullWidth
          variant='outlined'
          sx={{ marginTop: 0, height: 50, width: { xs: '100%', md: 150 } }}
          defaultValue={defaultSelectValue()}
          onChange={handleChange as any}
        >
          {renderSelectItems(
            selectOptions.map(option => ({
              label: option,
              value: option
            }))
          )}
        </Select>
      </Grid>

      <Grid
        data-testid='primarySearch'
        item
        sx={{ ml: { md: 2 }, mt: { xs: 2, md: 0 } }}
      >
        <TextInputSearchFilter
          fullWidth
          placeholder='Search'
          filterValue={currentFilter as QueryFilter}
        />
      </Grid>
    </Grid>
  )
}
