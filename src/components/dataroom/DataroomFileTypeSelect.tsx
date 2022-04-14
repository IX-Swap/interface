import React from 'react'
import { SelectProps } from '@mui/material'
import { renderSelectItems } from 'helpers/rendering'
import { DataroomDocumentType } from 'config/dataroom'
import { Select } from 'ui/Select/Select'
import { SelectItem } from 'ui/Select/SelectItem/SelectItem'

export const DataroomFileTypeSelect = (props: SelectProps) => {
  return (
    <Select {...props} style={{ minWidth: 200 }}>
      <SelectItem disabled value={undefined}>
        Document Type
      </SelectItem>
      {renderSelectItems(
        Object.values(DataroomDocumentType).map(value => ({
          label: value,
          value
        }))
      )}
    </Select>
  )
}
