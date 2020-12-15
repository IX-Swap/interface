import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { useSelectionHelperContext } from 'components/SelectionHelper'

export const LIST_ITEM_ICON_WIDTH = 56

export const SelectableDataroomHeader = () => {
  const { hasSelected } = useSelectionHelperContext()

  return (
    <DataroomHeader
      style={{ marginLeft: hasSelected ? LIST_ITEM_ICON_WIDTH : 0 }}
    />
  )
}
