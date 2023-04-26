import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { CorporateAccreditationView } from 'app/pages/identity/components/CorporateAccreditationView/CorporateAccreditationView'
import { CorporateAccreditationContainer } from 'app/pages/identity/containers/CorporateAccreditationContainer'

export const CorporateAccreditationAuthorization = () => {
  return (
    <CorporateAccreditationContainer
      component={({ data }) => (
        <AuthorizerView
          title={data.companyLegalName}
          data={data}
          feature={AppFeature.CorporatesAccreditation}
          statusFieldName='accreditationStatus'
        >
          <CorporateAccreditationView data={data} />
        </AuthorizerView>
      )}
    />
  )
}
