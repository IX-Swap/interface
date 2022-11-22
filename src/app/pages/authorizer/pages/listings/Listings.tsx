import React from 'react'
import { AuthorizerList } from '../../components/AuthorizerList'
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
