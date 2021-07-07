import { CreateIdentityCard } from 'app/pages/identity/components/NoIdentityView/CreateIdentityCard'
import { IdentityRoute } from 'app/pages/identity/router/config'
import React from 'react'

export const CreateIndividualIdentityButton = () => {
  return (
    <CreateIdentityCard
      title='Individual'
      content='Information about the individual section will be placed here.'
      cardColor='green'
      isLink
      linkLabel='CREATE INDIVIDUAL IDENTITY'
      linkPath={IdentityRoute.createIndividual}
    />
  )
}
