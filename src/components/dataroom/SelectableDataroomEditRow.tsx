import React from 'react'
import { Checkbox, TableCell, TableRow } from '@material-ui/core'
import {
  DataroomRowUploader,
  DataroomRowUploaderProps
} from 'components/dataroom/DataroomRowUploader'

export interface SelectableDataroomEditRowProps
  extends DataroomRowUploaderProps {
  isSelected: boolean
  hasSelected: boolean
  toggleItem: () => void
}

export const SelectableDataroomEditRow = (
  props: SelectableDataroomEditRowProps
) => {
  const { isSelected, toggleItem, hasSelected, ...rest } = props
  const handleDelete = () => {
    if (hasSelected) {
      toggleItem()
    }

    rest.onDelete?.()
  }

  return (
    <TableRow onClick={toggleItem}>
      <TableCell width={50}>
        <Checkbox checked={isSelected} />
      </TableCell>
      <DataroomRowUploader {...rest} onDelete={handleDelete} />
    </TableRow>
  )
}
