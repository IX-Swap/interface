import { NewAction } from 'app/pages/authorizer/components/NewAction'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'

export interface MobileActionsProps {
  edit: () => void
  remove: () => void
  view: () => void
}

export const MobileActions = ({ edit, remove, view }: MobileActionsProps) => {
  return (
    <>
      <NewAction
        label='View Details'
        icon={<Icon name='eye' />}
        onClick={view}
      />
      <NewAction label='Edit' icon={<Icon name='edit' />} onClick={edit} />
      <NewAction label='Delete' icon={<Icon name='trash' />} onClick={remove} />
    </>
  )
}
