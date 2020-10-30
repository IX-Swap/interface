import React from 'react'
import { useSelectionHelperContext } from 'v2/components/SelectionHelper'
import { DataroomRowUploaderProps } from 'v2/components/dataroom/DataroomRowUploader'
import { SelectableDataroomEditRow } from 'v2/components/dataroom/SelectableDataroomEditRow'
import { SelectableAuthorizationDocument } from 'v2/app/pages/authorizer/components/SelectableAuthorizationDocument'

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

  return props.variant === 'row' ? (
    <SelectableDataroomEditRow
      {...props}
      isSelected={isSelected}
      toggleItem={toggleItem}
      hasSelected={hasSelected}
    />
  ) : (
    <SelectableAuthorizationDocument
      {...props}
      isSelected={isSelected}
      toggleItem={toggleItem}
      hasSelected={hasSelected}
    />
  )
}
