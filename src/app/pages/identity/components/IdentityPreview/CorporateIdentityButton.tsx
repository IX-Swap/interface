import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import DomainIcon from '@mui/icons-material/Domain'
import { Button } from '@mui/material'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

export interface CorporateIdentityButtonProps {
  identity: CorporateIdentity
  active: boolean
  onClick: () => void
}

export const CorporateIdentityButton = ({
  active,
  onClick,
  identity
}: CorporateIdentityButtonProps) => {
  const titleMap = {
    investor: 'Corporate',
    'Fund Manager': 'Fund Manager',
    'Fund Administrator': 'Fund Administrator',
    'Portfolio Manager': 'Portfolio Manager',
    issuer: ''
  }

  return (
    <Button
      disableRipple
      disableElevation
      onClick={onClick}
      style={{ backgroundColor: 'transparent' }}
    >
      <CreateIdentityCard
        title={titleMap[identity.type]}
        content='Suitable for users who want to invest via a corporate capacity'
        active={active}
        cardColor='red'
        contentIcon={<DomainIcon />}
      />
    </Button>
  )
}
