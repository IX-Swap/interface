import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'

export interface RejectSelectionButtonProps {
  reject?: (selected: any[]) => void
  disabled?: boolean
}

export const RejectSelectionButton = ({
  reject,
  disabled = false
}: RejectSelectionButtonProps) => {
  const { hasSelected, selected } = useSelectionHelperContext()
  const handleClick = () => {
    reject?.(selected.map((item: any) => item._id))
  }

  return (
    <RejectButton disabled={!hasSelected || disabled} reject={handleClick} />
  )
}
