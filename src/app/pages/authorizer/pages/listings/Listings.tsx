import React from 'react'
import { AuthorizerList } from '../../components/AuthorizerList'
import { columns } from './columns'

export const Listings = () => {
  return (
    <AuthorizerList
      title='Authorize Listings'
      uri='/exchange/listing/list'
      name={'listings'}
      columns={columns}
    />
  )
}
