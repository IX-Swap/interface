import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/listings/columns'

export const Listings: React.FC = () => (
  <BaseView
    title='Listings Module'
    uri='/exchange/listings/list'
    name='authorizerListingsList'
    columns={columns}
  />
)
