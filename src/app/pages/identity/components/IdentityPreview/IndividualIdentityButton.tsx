import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { Button } from '@mui/material'

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
