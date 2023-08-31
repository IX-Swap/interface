import React from 'react'
import { Box } from '@mui/material'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { getPersonName } from 'helpers/strings'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'

export const IndividualAuthorization = () => {
  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <AuthorizerView
          title={getPersonName(data)}
          data={data}
          feature={AppFeature.Individuals}
          hideActions
        >
          <Box sx={{ marginTop: '-42px' }}>
            <IndividualPreview data={data} isForAuthorizer />
          </Box>
        </AuthorizerView>
      )}
    />
  )
}
