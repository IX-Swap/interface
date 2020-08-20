import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/listings/columns'

export const Listings: React.FC = () => (
  <BaseView
    title='Listings Module'
    uri='/exchange/listings/list'
    name='authorizerListingsList'
    columns={columns}
  />
)
