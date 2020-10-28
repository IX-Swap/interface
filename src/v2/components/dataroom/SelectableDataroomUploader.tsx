import React from 'react'
import { useSelectionHelperContext } from 'v2/components/SelectionHelper'
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

export interface SelectableDataroomUploaderProps
  extends DataroomRowUploaderProps {
  index: number
}

export const SelectableDataroomUploader = (
  props: SelectableDataroomUploaderProps
) => {
  const { isItemSelected, toggle, hasSelected } = useSelectionHelperContext()
  const toggleItem = () => toggle({ id: props.value?._id, index: props.index })
  const isSelected = isItemSelected({
    id: props.value?._id,
    index: props.index
  })

  return (
    <ListItem component='div' button onClick={toggleItem}>
      {hasSelected && (
        <ListItemIcon>
          <Checkbox checked={isSelected} onClick={toggleItem} />
        </ListItemIcon>
      )}
      <ListItemText>
        <DataroomRowUploader {...props} />
      </ListItemText>
    </ListItem>
  )
}
