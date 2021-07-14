import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import { Button } from '@material-ui/core'

export interface IndividualIdentityButtonProps {
  active: boolean
  onClick: () => void
}

export const IndividualIdentityButton = ({
  active,
  onClick
}: IndividualIdentityButtonProps) => {
  return (
    <Button
      disableRipple
      disableElevation
      onClick={onClick}
      style={{ backgroundColor: 'transparent' }}
    >
      <CreateIdentityCard
        title='Individual'
        content='Suitable for users who want to invest in personal capacity'
        active={active}
        cardColor='green'
        contentIcon={<PermIdentityIcon />}
      />
    </Button>
  )
}
