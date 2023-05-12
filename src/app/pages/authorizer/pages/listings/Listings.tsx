import React from 'react'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { columns } from './columns'

export const Listings = () => {
  return (
    <AuthorizerList
      title='Authorize Listings'
      uri={`/exchange/combinedListing`}
      name={'listings'}
      columns={columns}
    />
  )
}
