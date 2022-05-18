import { ListingDetails } from 'app/pages/issuance/components/ListingDetails/ListingDetails'
import { useListing } from 'app/pages/invest/hooks/useListing'
import React from 'react'

export const ViewListing = () => {
  const { data, isLoading } = useListing()

  if (isLoading || data === undefined) {
    return null
  }

  return <ListingDetails withoutActions={true} data={data} />
}
