import React from 'react'
import { MenuItem, Select } from '@material-ui/core'
import { renderMenu } from '../../helpers/rendering'

export enum DataroomFileType {
  SupportingDocument = 'Supporting Document',
  Other = 'Other'
}

export const DataroomFileTypeSelect = (props: any) => {
  return (
    <Select {...props}>
      <MenuItem disabled value={undefined}>
        File Type
      </MenuItem>
      {renderMenu(
        Object.values(DataroomFileType).map(value => ({
          label: value,
          value
        }))
      )}
    </Select>
  )
}
