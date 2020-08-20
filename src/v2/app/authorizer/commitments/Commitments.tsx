import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/commitments/columns'

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
