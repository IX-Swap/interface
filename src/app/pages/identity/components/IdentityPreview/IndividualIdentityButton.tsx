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
        content='Information about the individual 
  section will be placed here.'
        active={active}
        cardColor='green'
        contentIcon={<PermIdentityIcon />}
      />
    </Button>
  )
}
