import React from 'react'
import { MenuItem, Select, SelectProps } from '@material-ui/core'
import { renderMenu } from 'v2/helpers/rendering'
import { DataroomDocumentType } from 'v2/config/dataroom'

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
