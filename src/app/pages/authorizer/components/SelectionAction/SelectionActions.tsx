import { Box } from '@material-ui/core'
import { ApproveSelectionButton } from 'app/pages/authorizer/components/SelectionAction/ApproveSelectionButton'
import { RejectSelectionButton } from 'app/pages/authorizer/components/SelectionAction/RejectSelectionButton'
import React from 'react'

export interface AuthorizerSelectionActions {
  approve?: () => void
  reject?: () => void
}

export interface SelectionActionsProps {
  actions: AuthorizerSelectionActions
}

export const SelectionActions = ({ actions }: SelectionActionsProps) => {
  return (
    <Box display='flex' justifyContent='flex-end'>
      <RejectSelectionButton reject={actions.reject} />
      <Box px={1} />
      <ApproveSelectionButton approve={actions.approve} />
    </Box>
  )
}
