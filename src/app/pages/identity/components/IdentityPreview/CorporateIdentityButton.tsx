import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import React from 'react'
import DomainIcon from '@material-ui/icons/Domain'
import { Button } from '@material-ui/core'

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
        content='Suitable for the users planning to invest as a corporate investor.'
        active={active}
        cardColor='red'
        contentIcon={<DomainIcon />}
      />
    </Button>
  )
}
