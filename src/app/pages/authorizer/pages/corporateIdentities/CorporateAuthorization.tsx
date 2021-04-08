import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { CorporateIssuerView } from 'app/pages/_identity/components/CorporateIssuerView/CorporateIssuerView'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { CorporateIdentityContainer } from 'app/pages/_identity/containers/CorporateIdentityContainer'

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
