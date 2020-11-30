import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenu } from 'helpers/rendering'
import { DataroomDocumentType } from 'config/dataroom'

export const DataroomFileTypeSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        Document Type
      </MenuItem>
      {renderMenu(
        Object.values(DataroomDocumentType).map(value => ({
          label: value,
          value
        }))
      )}
    </Select>
  )
}
