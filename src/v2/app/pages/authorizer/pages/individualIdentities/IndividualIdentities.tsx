import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/pages/authorizer/pages/individualIdentities/columns'
import { IndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
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
  <IndividualIdentityForm identity={i} isEditing={false} useOwnEmail={false} />
)
