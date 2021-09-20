import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import React from 'react'

export interface ApproveSelectionButtonProps {
  approve?: (selected: any[]) => void
  disabled?: boolean
}

export const ApproveSelectionButton = ({
  approve,
  disabled = false
}: ApproveSelectionButtonProps) => {
  const { hasSelected, selected } = useSelectionHelperContext()
  const handleClick = () => {
    approve?.(selected.map((item: any) => item._id))
  }

  return (
    <ApproveButton disabled={!hasSelected || disabled} approve={handleClick} />
  )
}
