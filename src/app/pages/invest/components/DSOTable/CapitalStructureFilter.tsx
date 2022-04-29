import { CapitalStructureSelect } from 'components/form/CapitalStructureSelect'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import React, { ChangeEvent } from 'react'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export const CapitalStructureFilter = () => {
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const value = getFilterValue('capitalStructure')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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
      inputProps={{ 'data-testid': 'select' }}
      style={{
        borderTopLeftRadius: isMobile ? theme.spacing(0.5) : 0,
        borderBottomLeftRadius: isMobile ? theme.spacing(0.5) : 0,
        marginTop: -12,
        height: 53,
        backgroundColor:
          theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
      }}
      variant='outlined'
      defaultValue='All'
      value={value ?? 'All'}
      labelBetweenAll={'Capital Structure'}
      onChange={handleChange}
    />
  )
}
