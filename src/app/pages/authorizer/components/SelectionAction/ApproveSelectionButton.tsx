import { ApproveButton } from 'app/pages/authorizer/components/ApproveButton'
import { useSelectionHelperContext } from 'components/SelectionHelper'
import React from 'react'

export interface ApproveSelectionButtonProps {
  approve?: () => void
}

export const ApproveSelectionButton = ({
  approve
}: ApproveSelectionButtonProps) => {
  const { hasSelected } = useSelectionHelperContext()
  const handleClick = () => {
    approve?.()
  }

  return <ApproveButton disabled={!hasSelected} approve={handleClick} />
}
