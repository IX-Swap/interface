import React from 'react'
import { MenuItem, Select, SelectProps } from '@mui/material'
import { renderMenuItems } from 'helpers/rendering'
import { DataroomDocumentType } from 'config/dataroom'

export const DataroomFileTypeSelect = (props: SelectProps) => {
  return (
    <Select {...props} style={{ minWidth: 200 }}>
      <MenuItem disabled value={undefined}>
        Document Type
      </MenuItem>
      {renderMenuItems(
        Object.values(DataroomDocumentType).map(value => ({
          label: value,
          value
        }))
      )}
    </Select>
  )
}
