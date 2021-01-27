import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import { DataroomRowUploaderProps } from 'components/dataroom/DataroomRowUploader'
import { SelectableDataroomEditRow } from 'components/dataroom/SelectableDataroomEditRow'

export interface SelectableDataroomUploaderProps
  extends DataroomRowUploaderProps {
  index: number
  variant?: 'row' | 'grid'
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
    <SelectableDataroomEditRow
      {...props}
      isSelected={isSelected}
      toggleItem={toggleItem}
      hasSelected={hasSelected}
    />
  )
}
