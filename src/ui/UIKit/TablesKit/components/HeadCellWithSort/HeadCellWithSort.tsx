import { Box } from '@mui/material'
import { ReactComponent as SortActiveIcon } from 'app/pages/invest/components/SecondaryMarketTable/icons/sort_active.svg'
import { ReactComponent as SortDefaultIcon } from 'app/pages/invest/components/SecondaryMarketTable/icons/sort_default.svg'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import React from 'react'

export const HeadCellWithSort = ({
  label,
  field
}: {
  label: string
  field: string
}) => {
  const { isTablet } = useAppBreakpoints()
  const { getFilterValue, updateFilter, removeFilter } = useQueryFilter()
  const sortBy = getFilterValue('sortBy')
  const orderBy = getFilterValue('orderBy')
  const onClick = (fieldName: string) => {
    updateFilter('sortBy', fieldName)
    switch (orderBy) {
      case undefined:
      case 'ASC':
        updateFilter('orderBy', 'DSC')
        break
      case 'DSC':
        updateFilter('orderBy', 'ASC')
        break
      default:
        removeFilter('orderBy')
        break
    }
  }

  if (isTablet) {
    return <>{label}</>
  }

  return (
    <Box
      onClick={() => onClick(field)}
      display={'flex'}
      alignItems={'center'}
      style={{ cursor: 'pointer', userSelect: 'none' }}
    >
      {label}
      <Box
        display={'flex'}
        flexDirection={'column'}
        style={{
          transform: `rotate(${orderBy === 'ASC' ? 0 : '180deg'})`
        }}
      >
        {orderBy === undefined || field !== sortBy ? (
          <SortDefaultIcon />
        ) : (
          <SortActiveIcon />
        )}
      </Box>
    </Box>
  )
}
