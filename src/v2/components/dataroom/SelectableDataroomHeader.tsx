import React from 'react'
import { DataroomHeader } from 'v2/components/dataroom/DataroomHeader'
import { useSelectionHelperContext } from 'v2/components/SelectionHelper'

export interface SelectableDataroomHeaderProps {}

export const LIST_ITEM_ICON_WIDTH = 56

export const SelectableDataroomHeader = (
  props: SelectableDataroomHeaderProps
) => {
  const { hasSelected } = useSelectionHelperContext()

  return (
    <DataroomHeader
      style={{ marginLeft: hasSelected ? LIST_ITEM_ICON_WIDTH : 0 }}
    />
  )
}
