import { ListingDetails } from 'app/pages/exchange/market/components/ListingDetails/ListingDetails'
import { useListing } from 'app/pages/exchange/market/hooks/useListing'
import React from 'react'
import { AppFeature } from 'types/app'
import { AuthorizerView } from '../../components/AuthorizerView'

export const ListingAuthorization = () => {
  const { data, isLoading } = useListing()

  if (isLoading || data === undefined) {
    return null
  }

  return (
    <AuthorizerView
      title={data.tokenName}
      data={data as any} // TODO: fix types
      feature={AppFeature.Listings}
    >
      <ListingDetails data={data} />
    </AuthorizerView>
  )
}
