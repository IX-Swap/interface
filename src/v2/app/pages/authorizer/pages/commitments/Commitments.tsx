import React from 'react'
import { AuthorizerTable as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerTable'
import { columns } from 'v2/app/pages/authorizer/pages/commitments/columns'

export const Commitments: React.FC = () => (
  <BaseView
    title='Authorize Commitment'
    uri='/issuance/commitments/list'
    name='authorizerCommitmentsList'
    columns={columns}
    renderView={renderCommitment}
  />
)

export const renderCommitment = (): JSX.Element => <div />
