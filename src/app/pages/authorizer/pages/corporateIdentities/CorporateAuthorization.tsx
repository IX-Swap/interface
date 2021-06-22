import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { CorporateIssuerView } from 'app/pages/identity/components/CorporateIssuerView/CorporateIssuerView'
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
          {data.type === 'issuer' ? (
            <CorporateIssuerView data={data} />
          ) : (
            <CorporateIdentityView data={data} />
          )}
        </AuthorizerView>
      )}
    />
  )
}
