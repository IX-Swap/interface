import React from 'react'
import { columns } from 'app/pages/authorizer/pages/commitments/columns'
import { AuthorizerList } from 'app/pages/authorizer/components/upgrade/AuthorizerList/AuthorizerList'
import { authorizerQueryKeys } from 'config/queryKeys'
import { Commitment } from 'types/commitment'
import { AuthorizerSelectionActions } from 'app/pages/authorizer/components/SelectionAction/SelectionActions'
import { useBulkAuthorizeCommitments } from 'app/pages/authorizer/hooks/useBulkAuthorizeCommitment'
import { useSearchQuery } from 'hooks/useSearchQuery'

export const Commitments: React.FC = () => {
  const [approve, { isLoading: approveLoading }] =
    useBulkAuthorizeCommitments('approve')
  const [reject, { isLoading: rejectLoading }] =
    useBulkAuthorizeCommitments('reject')

  const searchQuery = useSearchQuery()
  const fundStatus = searchQuery.get('fundStatus')

  const selectionActions: AuthorizerSelectionActions = {
    approve: {
      action: approve,
      disabled: approveLoading
    },
    reject: {
      action: reject,
      disabled: rejectLoading
    }
  }

  return (
    <AuthorizerList<Commitment>
      title='Authorize Commitments'
      uri='/issuance/commitments/list'
      name={authorizerQueryKeys.getCommitmentsList}
      columns={columns}
      hasStatusWithActions={false}
      selectable={fundStatus === 'Funds on hold'}
      selectionActions={selectionActions}
    />
  )
}
