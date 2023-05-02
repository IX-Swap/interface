import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { getPersonName } from 'helpers/strings'
import { IndividualAccreditationView } from 'app/pages/identity/components/IndividualAccreditationView/IndividualAccreditationView'
import { IndividualAccreditationContainer } from 'app/pages/identity/containers/IndividualAccreditationContainer'

export const IndividualAccreditationAuthorization = () => {
  return (
    <IndividualAccreditationContainer
      component={({ data }) => (
        <AuthorizerView
          title={getPersonName(data)}
          data={data}
          feature={AppFeature.IndividualsAccreditation}
          statusFieldName='accreditationStatus'
        >
          <IndividualAccreditationView data={data} />
        </AuthorizerView>
      )}
    />
  )
}
