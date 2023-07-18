import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { List } from '@mui/material'
import { Action } from 'app/pages/authorizer/components/Action'
// import {
//   AssignmentTurnedIn as ApproveIcon,
//   Gavel as RejectIcon,
//   Launch as LaunchIcon
// } from '@mui/icons-material'
import { ReactComponent as ApproveIcon } from 'assets/icons/actions/approve.svg'
import { ReactComponent as RejectIcon } from 'assets/icons/actions/reject.svg'
import { ReactComponent as LaunchIcon } from 'assets/icons/actions/view.svg'
import { useTheme } from '@mui/styles'

export interface ActionsDropdownContentProps extends DropdownContentProps {
  approve: () => void
  reject: () => void
  view: () => void
  hideApproval?: boolean
  hideRejection?: boolean
  hideView?: boolean
}

export const ActionsDropdownContent = (props: ActionsDropdownContentProps) => {
  const {
    approve,
    reject,
    view,
    injectedProps,
    hideApproval = false,
    hideRejection = false,
    hideView = false
  } = props
  const theme = useTheme()

  return (
    <List data-testid='dropdown' onClick={injectedProps.close}>
      {!hideApproval && (
        <Action
          label='Approve'
          icon={ApproveIcon}
          onClick={approve}
          style={{
            borderBottom: `1px solid ${theme.palette.table.border}`
          }}
        />
      )}

      {!hideRejection && (
        <Action
          label='Reject'
          icon={RejectIcon}
          onClick={reject}
          style={{
            borderBottom: `1px solid ${theme.palette.table.border}`
          }}
        />
      )}

      {!hideView && (
        <Action label='View Application' icon={LaunchIcon} onClick={view} />
      )}
    </List>
  )
}
