import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'

export const CreateCorporateIdentityButton = () => {
  return (
    <CreateIdentityCard
      title='Corporate'
      content='Suitable for users who want to invest via a corporate capacity'
      cardColor='red'
      isLink
      linkLabel='CREATE CORPORATE IDENTITY'
      linkPath={IdentityRoute.createCorporate}
    />
  )
}
