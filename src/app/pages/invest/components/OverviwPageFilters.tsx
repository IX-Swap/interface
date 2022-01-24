import React, { ChangeEvent, useState } from 'react'
import { Grid, Select } from '@material-ui/core'
import { SearchFilter } from 'app/components/SearchFilter'
import { QueryFilter, useQueryFilter } from 'hooks/filters/useQueryFilter'
import { renderMenuItems } from 'helpers/rendering'

export const OverviewPageFilters = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const selectOptions = ['All', 'Primary', 'OTC', 'Secondary']
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
      return 'All'
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

    return 'All'
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
    <Grid container direction='column'>
      <Grid item container spacing={2}>
        <Grid item xs={6} md={4}>
          <Select
            fullWidth
            variant='outlined'
            defaultValue={defaultSelectValue()}
            onChange={handleChange as any}
          >
            {renderMenuItems(
              selectOptions.map(option => ({
                label: option,
                value: option
              }))
            )}
          </Select>
        </Grid>

        <Grid data-testid='primarySearch' item xs={12} md={8}>
          <SearchFilter
            fullWidth
            placeholder='Search'
            filterValue={currentFilter as QueryFilter}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
