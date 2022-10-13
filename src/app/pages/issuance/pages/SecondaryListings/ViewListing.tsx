import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'
import { useListing, useListingOTC } from 'app/pages/invest/hooks/useListing'
import React from 'react'

export const ViewListing = () => {
  const { data, isLoading } = useListing()

  if (isLoading) {
    return null
  }

  return <ListingDetails data={data} />
}

export const ViewListingOTC = () => {
  const { data, isLoading } = useListingOTC()

  if (isLoading) {
    return null
  }

  return <ListingDetails data={data} />
}
