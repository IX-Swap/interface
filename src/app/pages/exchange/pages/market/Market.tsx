import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const Market = () => {
  return (
    <RootContainer>
      <PageHeader title={'Market'} alignment='center' showBreadcrumbs={true} />
    </RootContainer>
  )
}
