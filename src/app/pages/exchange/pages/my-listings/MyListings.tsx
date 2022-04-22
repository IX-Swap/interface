import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { MyListingsTable } from 'app/pages/exchange/components/MyListingsTable/MyListingsTable'

export const MyListings = () => {
  return (
    <RootContainer>
      <PageHeader title={'My Listings'} showBreadcrumbs={true} />
      <MyListingsTable />
    </RootContainer>
  )
}
