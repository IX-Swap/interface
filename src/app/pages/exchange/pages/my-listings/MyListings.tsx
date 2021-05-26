import React from 'react'

import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { MyListingsTable } from '../../market/components/MyListingsTable/MyListingsTable'

export const MyListings = () => {
  return (
    <RootContainer>
      <PageHeader
        title={'My Listings'}
        alignment='center'
        showBreadcrumbs={true}
      />
      <MyListingsTable />
    </RootContainer>
  )
}
