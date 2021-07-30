import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'

export const CreateIssuerIdentityButton = () => {
  return (
    <CreateIdentityCard
      title='Issuer'
      content='Suitable for users who want to use InvestaX platform for fundraising'
      cardColor='blue'
      isLink
      linkLabel='CREATE ISSUER IDENTITY'
      linkPath={IdentityRoute.createIssuer}
    />
  )
}
