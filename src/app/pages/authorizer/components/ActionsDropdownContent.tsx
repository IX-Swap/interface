import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { List } from '@mui/material'
import { Action } from 'app/pages/authorizer/components/Action'

import { ReactComponent as ApproveIcon } from 'assets/icons/actions/approve.svg'
import { ReactComponent as RejectIcon } from 'assets/icons/actions/reject.svg'
import { ReactComponent as LaunchIcon } from 'assets/icons/actions/view.svg'

export interface ActionsDropdownContentProps extends DropdownContentProps {
  approve: () => void
  reject: () => void
  view: () => void
}

export const ActionsDropdownContent = (props: ActionsDropdownContentProps) => {
  const { approve, reject, view, injectedProps } = props
  return (
    <List data-testid='dropdown' onClick={injectedProps.close}>
      <Action label='Approve' icon={ApproveIcon} onClick={approve} />
      <Action label='Reject' icon={RejectIcon} onClick={reject} />
      <Action label='View Application' icon={LaunchIcon} onClick={view} />
    </List>
  )
}
