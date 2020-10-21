import React from 'react'
import { columns } from 'v2/app/pages/authorizer/pages/corporateIdentities/columns'
import { CorporateIdentity } from 'v2/types/identity'
import { AuthorizerView } from 'v2/app/pages/authorizer/components/AuthorizerView'
import { DataroomFeature } from 'v2/types/authorizer'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { AuthorizerList } from 'v2/app/pages/authorizer/components/AuthorizerList'

export const CorporateIdentities: React.FC = () => (
  <AuthorizerList
    title='Authorize Corporate Identity'
    uri='/identity/corporates/list'
    name='authorizerCorporatesList'
    columns={columns}
    renderView={renderCorporateIdentity}
  />
)

export const renderCorporateIdentity = (i: CorporateIdentity): JSX.Element => (
  <AuthorizerView
    title='About This Corporate'
    data={i}
    feature={DataroomFeature.corporates}
  >
    <CorporateIdentityForm data={i} isEditing={false} useOwnEmail={false} />
  </AuthorizerView>
)
