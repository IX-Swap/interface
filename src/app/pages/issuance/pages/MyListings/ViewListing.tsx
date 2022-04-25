import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'
import { useListing } from 'app/pages/invest/hooks/useListing'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const ViewListing = () => {
  const { data, isLoading } = useListing()

  if (isLoading) {
    return null
  }

  return (
    <RootContainer>
      <ListingDetails data={data} />
    </RootContainer>
  )
}
