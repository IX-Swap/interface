import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import DomainIcon from '@mui/icons-material/Domain'
import { Button } from '@mui/material'

export interface CorporateIdentityButtonProps {
  active: boolean
  onClick: () => void
}

export const CorporateIdentityButton = ({
  active,
  onClick
}: CorporateIdentityButtonProps) => {
  return (
    <Button
      disableRipple
      disableElevation
      onClick={onClick}
      style={{ backgroundColor: 'transparent' }}
    >
      <CreateIdentityCard
        title='Corporate'
        content='Suitable for users who want to invest via a corporate capacity'
        active={active}
        cardColor='red'
        contentIcon={<DomainIcon />}
      />
    </Button>
  )
}
