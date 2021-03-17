import React from 'react'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { useSelectionHelperContext } from 'components/SelectionHelper'

export const SelectableDataroomHeader = () => {
  const { hasSelected } = useSelectionHelperContext()

  return <DataroomHeader hasSelected={hasSelected} />
}
