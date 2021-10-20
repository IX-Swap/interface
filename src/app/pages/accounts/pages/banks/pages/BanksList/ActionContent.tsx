import React from 'react'
import { List } from '@material-ui/core'
import { Action } from 'app/pages/authorizer/components/Action'
import { DropdownContentProps } from 'app/components/Dropdown/Dropdown'

import {
  Launch as LaunchIcon,
  Edit as EditIcon,
  Delete as RemoveIcon
} from '@material-ui/icons'

export interface ActionContentProps extends DropdownContentProps {
  edit: () => void
  remove: () => void
  view: () => void
}

export const ActionContent = ({
  edit,
  remove,
  view,
  injectedProps
}: ActionContentProps) => {
  return (
    <List data-testid='dropdown' onClick={injectedProps.close}>
      <Action label='View' icon={LaunchIcon} onClick={view} />
      <Action label='Edit' icon={EditIcon} onClick={edit} />
      <Action label='Remove' icon={RemoveIcon} onClick={remove} />
    </List>
  )
}
