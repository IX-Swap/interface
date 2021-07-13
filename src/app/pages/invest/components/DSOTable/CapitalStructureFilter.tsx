import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const CapitalStructureFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('capitalStructure')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handleChange = (event: ChangeEvent<{ value: string }>) => {
    const {
      target: { value }
    } = event

    if (value === 'All') {
      removeFilter('capitalStructure')
    } else {
      updateFilter('capitalStructure', event.target.value)
    }
  }

  return (
    <CapitalStructureSelect
      includeAll
      fullWidth
      style={{
        borderTopLeftRadius: isMobile ? theme.spacing(0.5) : 0,
        borderBottomLeftRadius: isMobile ? theme.spacing(0.5) : 0,
        backgroundColor:
          theme.palette.grey[theme.palette.type === 'light' ? 200 : 800]
      }}
      variant='outlined'
      defaultValue='All'
      value={value ?? 'All'}
      labelBetweenAll={'Capital Structure'}
      onChange={handleChange}
    />
  )
}
