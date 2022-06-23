import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'

export const CorporateAuthorization = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <AuthorizerView
          title={data.companyLegalName}
          data={data}
          feature={AppFeature.Corporates}
        >
          <CorporateIdentityView
            data={data}
            isIssuer={data.type === 'issuer'}
          />
        </AuthorizerView>
      )}
    />
  )
}
