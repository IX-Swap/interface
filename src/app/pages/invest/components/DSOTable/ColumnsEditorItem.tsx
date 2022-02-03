import React from 'react'
import { formatCamelCasedWithSpaces } from 'helpers/strings'
import { DSOTableColumn } from 'types/dso'
import { Box, Chip } from '@mui/material'

export interface ColumnsEditorItemProps {
  value: DSOTableColumn
  isSelected: boolean
  onDeselect: (key: DSOTableColumn) => any
  onSelect: (key: DSOTableColumn) => any
}

export const ColumnsEditorItem = (props: ColumnsEditorItemProps) => {
  const { value, isSelected, onSelect, onDeselect } = props
  const label = () => {
    if (value === 'tokenName') {
      return 'Offer Name'
    }

    if (value === 'completionDate') {
      return 'Closing Date'
    }
    if (value === 'interestRate') {
      return 'Expected Return'
    }

    if (value === 'totalFundraisingAmount') {
      return 'Raising'
    }

    if (value === 'minimumInvestment') {
      return 'Min. Investment'
    }

    return formatCamelCasedWithSpaces(value)
  }
  const disabled =
    value === 'favorite' || value === 'tokenName' || value === 'insight'

  return (
    <Box mr={2.5} mb={1.5}>
      <Chip
        label={label()}
        variant={isSelected ? 'filled' : 'outlined'}
        onClick={isSelected ? undefined : () => onSelect(value)}
        disabled={disabled}
        onDelete={isSelected ? () => onDeselect(value) : undefined}
      />
    </Box>
  )
}
