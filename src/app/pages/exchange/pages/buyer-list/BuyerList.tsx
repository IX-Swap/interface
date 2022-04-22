import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'

export const BuyerList = () => {
  return (
    <RootContainer>
      <PageHeader title={'Market'} alignment='center' showBreadcrumbs={true} />
    </RootContainer>
  )
}
