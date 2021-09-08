import { RejectButton } from 'app/pages/authorizer/components/RejectButton'
import React from 'react'
import { useSelectionHelperContext } from 'components/SelectionHelper'

export interface RejectSelectionButtonProps {
  reject?: () => void
}

export const RejectSelectionButton = ({
  reject
}: RejectSelectionButtonProps) => {
  const { hasSelected } = useSelectionHelperContext()
  const handleClick = () => {
    reject?.()
  }

  return <RejectButton disabled={!hasSelected} reject={handleClick} />
}
