import React from 'react'
import {
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {
  DataroomRowUploader,
  DataroomRowUploaderProps
} from 'v2/components/dataroom/DataroomRowUploader'

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
    <ListItem component='div' button onClick={toggleItem}>
      {hasSelected && (
        <ListItemIcon>
          <Checkbox checked={isSelected} />
        </ListItemIcon>
      )}
      <ListItemText>
        <DataroomRowUploader {...rest} onDelete={handleDelete} />
      </ListItemText>
    </ListItem>
  )
}
