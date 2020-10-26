import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/commitments/columns'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const Commitments: React.FC = () => (
  <AuthorizerList
    title='Authorize Commitment'
    uri='/issuance/commitments/list'
    name='authorizerCommitmentsList'
    columns={columns}
  />
)
