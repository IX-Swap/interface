import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/individual-identities/columns'
import IndividualIdentityForm from 'v2/app/components/identity-forms/individual'
import { IndividualIdentity } from 'v2/types/identity'

export const IndividualIdentities: React.FC = () => (
  <BaseView
    title='Authorize Individual Identity'
    uri='/identity/individuals/list'
    name='authorizerIntdividualIdentitesList'
    columns={columns}
    renderView={renderIndividualIdentityForm}
  />
)

export const renderIndividualIdentityForm = (
  i: IndividualIdentity
): JSX.Element => (
  <IndividualIdentityForm identity={i} editMode={false} useOwnEmail={false} />
)
