import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import DomainIcon from '@mui/icons-material/Domain'
import { Button } from '@mui/material'

export interface IssuerIdentityButtonProps {
  active: boolean
  onClick: () => void
}

export const IssuerIdentityButton = ({
  active,
  onClick
}: IssuerIdentityButtonProps) => {
  return (
    <Button
      disableRipple
      disableElevation
      onClick={onClick}
      style={{ backgroundColor: 'transparent' }}
    >
      <CreateIdentityCard
        title='Issuer'
        content='Suitable for users who want to use InvestaX platform for fundraising'
        active={active}
        cardColor='blue'
        contentIcon={<DomainIcon />}
      />
    </Button>
  )
}
