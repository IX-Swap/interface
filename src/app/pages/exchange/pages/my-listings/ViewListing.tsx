import { ListingDetails } from 'app/pages/exchange/market/components/ListingDetails/ListingDetails'
import React from 'react'
import { Listing } from 'types/listing'
import { RootContainer } from 'ui/RootContainer'

const sampleData: Listing = {
  _id: '123123',
  deleted: false,
  createdBy: 'admin',
  name: 'InvestaX Preferred Stock',
  asset: {
    _id: '5f732c538a568b50914d8372',
    deleted: false,
    createdBy: '5f73240373d4ab4b15fc1b2e',
    symbol: 'SGD',
    name: 'Singapore Dollars',
    type: 'Currency',
    numberFormat: {
      currency: 'SGD'
    },
    createdAt: '2020-09-29T12:45:07.411Z',
    updatedAt: '2020-10-05T03:14:17.244Z',
    description: 'test asset description'
  },
  description: 'Lorem ipsum dolor sit amet',
  companyName: 'InvestaX Digital Securities',
  explorer: '',
  createdAt: '',
  updatedAt: '',
  symbol: 'IXPS'
}

export const ViewListing = () => {
  return (
    <RootContainer>
      <ListingDetails data={sampleData} />{' '}
    </RootContainer>
  )
}
