import React from 'react'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { getPersonName } from 'helpers/strings'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'

export const IndividualAuthorization = () => {
  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <AuthorizerView
          title={getPersonName(data) as string}
          data={data}
          feature={AppFeature.IndividualsAuthorization}
        >
          <IndividualIdentityView data={data} />
        </AuthorizerView>
      )}
    />
  )
}
