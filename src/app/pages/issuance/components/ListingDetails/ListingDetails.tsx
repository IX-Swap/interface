import { DetailsTab } from 'app/pages/issuance/components/ListingDetails/DetailsTab'
import { ListingHeader } from 'app/pages/issuance/components/ListingDetails/ListingHeader'
import React from 'react'
import { ListingView } from 'types/listing'

export interface ListingDetailsProps {
  data?: ListingView
  withoutActions?: boolean
}

export const ListingDetails = ({
  data,
  withoutActions = false
}: ListingDetailsProps) => {
  if (data === undefined) {
    return null
  }

  return (
    <>
      <ListingHeader
        logoId={data.logo}
        name={data.tokenName}
        symbol={data.tokenSymbol}
        companyName={data.corporate?.companyLegalName}
        markets={data.markets}
        status={data.status}
        withoutActions={withoutActions}
        data={data}
      />
      <DetailsTab data={data} />
    </>
  )
}
