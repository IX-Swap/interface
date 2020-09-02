import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/listings/columns'

export const Listings: React.FC = () => (
  <BaseView
    title='Listings Module'
    uri='/exchange/listings/list'
    name='authorizerListingsList'
    columns={columns}
  />
)
