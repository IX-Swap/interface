import React from 'react'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'
import { List } from '@mui/material'
import { Action } from 'app/pages/authorizer/components/Action'
import { useHistory } from 'react-router-dom'

import {
  ThumbUpOffAlt as ApproveIconKYC,
  ThumbDownOffAlt as RejectIconKYC,
  RemoveRedEyeOutlined as LaunchIconKYC,
  AssignmentTurnedIn as ApproveIcon,
  Gavel as RejectIcon,
  Launch as LaunchIcon
} from '@mui/icons-material'

export interface ActionsDropdownContentProps extends DropdownContentProps {
  approve: () => void
  reject: () => void
  view: () => void
}

export const ActionsDropdownContent = (props: ActionsDropdownContentProps) => {
  const { approve, reject, view, injectedProps } = props
  const { location } = useHistory()
  return (
    <>
      {location?.pathname?.includes('individuals') ? (
        <List data-testid='dropdown' onClick={injectedProps.close}>
          <Action
            label='Approve'
            color='#6ABC10'
            icon={ApproveIconKYC}
            onClick={approve}
          />
          <Action
            label='Reject'
            color='#FF8080'
            icon={RejectIconKYC}
            onClick={reject}
          />
          <Action
            label='View Application'
            icon={LaunchIconKYC}
            onClick={view}
          />
        </List>
      ) : (
        <List data-testid='dropdown' onClick={injectedProps.close}>
          <Action label='Approve' icon={ApproveIcon} onClick={approve} />
          <Action label='Reject' icon={RejectIcon} onClick={reject} />
          <Action label='View Application' icon={LaunchIcon} onClick={view} />
        </List>
      )}
    </>
  )
}
