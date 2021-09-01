import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { List } from '@material-ui/core'
import { Action } from 'app/pages/authorizer/components/Action'
import {
  AssignmentTurnedIn as ApproveIcon,
  Gavel as RejectIcon,
  Launch as LaunchIcon,
  Warning as ApproveClosureIcon
} from '@material-ui/icons'

export interface ActionsDropdownContentProps extends DropdownContentProps {
  approve: () => void
  reject: () => void
  view: () => void
  approveClosure?: () => void
}

export const ActionsDropdownContent = (props: ActionsDropdownContentProps) => {
  const { approve, reject, view, approveClosure, injectedProps } = props

  const handleApproveClosure = () => {
    approveClosure?.()
  }

  return (
    <List data-testid='dropdown' onClick={injectedProps.close}>
      <Action label='Approve' icon={ApproveIcon} onClick={approve} />
      <Action label='Reject' icon={RejectIcon} onClick={reject} />
      {approveClosure !== undefined ? (
        <Action
          label='Approve Closure'
          icon={ApproveClosureIcon}
          onClick={handleApproveClosure}
        />
      ) : null}
      <Action label='View' icon={LaunchIcon} onClick={view} />
    </List>
  )
}
