import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/individualIdentities/columns'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { IndividualIdentity } from 'v2/types/identity'
import { AuthorizerView } from '../../components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const IndividualIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Individual Identity'
    uri='/identity/individuals/list'
    name='authorizerIndividualIdentitiesList'
    columns={columns}
    renderView={renderIndividualIdentityForm}
  />
)

export const renderIndividualIdentityForm = (
  i: IndividualIdentity
): JSX.Element => (
  <AuthorizerView
    title='About This Identity'
    data={i}
    feature={DataroomFeature.individuals}
  >
    <IndividualIdentityForm data={i} isEditing={false} useOwnEmail={false} />
  </AuthorizerView>
)
