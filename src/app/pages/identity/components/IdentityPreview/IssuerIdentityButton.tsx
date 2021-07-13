import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import DomainIcon from '@material-ui/icons/Domain'
import { Button } from '@material-ui/core'

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
