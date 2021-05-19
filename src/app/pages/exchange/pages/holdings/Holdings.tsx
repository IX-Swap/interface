import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const Holdings = () => {
  return (
    <RootContainer>
      <PageHeader title={'Market'} alignment='center' showBreadcrumbs={true} />
    </RootContainer>
  )
}
