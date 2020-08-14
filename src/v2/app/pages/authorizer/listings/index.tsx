import React from 'react'
import BaseView from '../base'
import columns from './data'

const Offerings = () => {
  return (
    <BaseView
      title='Listings Module'
      uri='/exchange/listings/list'
      name='authorizerListingsList'
      columns={columns}
    />
  )
}

export default Offerings
