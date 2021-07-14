import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'

export const CreateIndividualIdentityButton = () => {
  return (
    <CreateIdentityCard
      title='Individual'
      content='Suitable for users who want to invest in personal capacity'
      cardColor='green'
      isLink
      linkLabel='CREATE INDIVIDUAL IDENTITY'
      linkPath={IdentityRoute.createIndividual}
    />
  )
}
