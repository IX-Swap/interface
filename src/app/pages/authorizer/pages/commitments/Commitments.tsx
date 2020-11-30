import React from 'react'
import { columns } from 'app/pages/authorizer/pages/commitments/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'

export const Commitments: React.FC = () => (
  <AuthorizerList
    title='Authorize Commitment'
    uri='/issuance/commitments/list'
    name='authorizerCommitmentsList'
    columns={columns}
  />
)
