import React from 'react'
import { AuthorizerView as BaseView } from 'v2/app/authorizer/components/AuthorizerView'
import { columns } from 'v2/app/authorizer/corporate-identities/columns'
import CorporateIdentityForm from 'v2/app/components/identity-forms/corporate'
import { CorporateIdentity } from 'v2/types/identity'

export const CorporateIdentities: React.FC = () => (
  <BaseView
    title='Authorize Corporate Identity'
    uri='/identity/corporates/list'
    name='authorizerCorporatesList'
    columns={columns}
    renderView={renderCorporateIdentity}
  />
)

export const renderCorporateIdentity = (i: CorporateIdentity): JSX.Element => (
  <CorporateIdentityForm identity={i} editMode={false} useOwnEmail={false} />
)
