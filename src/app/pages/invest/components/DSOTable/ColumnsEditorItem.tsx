import React from 'react'
import { formatCamelCasedWithSpaces } from 'helpers/strings'
import { DSOTableColumn } from 'types/dso'
import { Box, Chip } from '@material-ui/core'

export interface ColumnsEditorItemProps {
  value: DSOTableColumn
  isSelected: boolean
  onDeselect: (key: DSOTableColumn) => any
  onSelect: (key: DSOTableColumn) => any
}

export const ColumnsEditorItem = (props: ColumnsEditorItemProps) => {
  const { value, isSelected, onSelect, onDeselect } = props
  const label = formatCamelCasedWithSpaces(value)
  const disabled =
    value === 'favorite' || value === 'tokenName' || value === 'insight'

  return (
    <Box mr={2.5} mb={1.5}>
      <Chip
        label={label}
        variant={isSelected ? 'default' : 'outlined'}
        onClick={isSelected ? undefined : () => onSelect(value)}
        disabled={disabled}
        onDelete={isSelected ? () => onDeselect(value) : undefined}
      />
    </Box>
  )
}
