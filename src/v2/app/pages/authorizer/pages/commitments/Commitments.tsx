import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/commitments/columns'
import { Commitment } from 'v2/types/commitment'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { CommitmentPreview } from 'v2/app/components/CommitmentPreview/CommitmentPreview'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const Commitments: React.FC = () => (
  <AuthorizerList
    title='Authorize Commitment'
    uri='/issuance/commitments/list'
    name='authorizerCommitmentsList'
    columns={columns}
    renderView={renderCommitment}
  />
)

export const renderCommitment = (c: Commitment): JSX.Element => (
  <AuthorizerView title='Title' data={c} feature={DataroomFeature.commitments}>
    <CommitmentPreview data={c} />
  </AuthorizerView>
)
