import React from 'react'
import { columns } from 'app/pages/authorizer/pages/commitments/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'

import { Commitment } from 'types/commitment'

export const Commitments: React.FC = () => {
  return (
    <AuthorizerList<Commitment>
      title='Authorize Commitment'
      uri='/issuance/commitments/list'
      name={authorizerQueryKeys.getCommitmentsList}
      columns={columns}
      selectable
    />
  )
}
