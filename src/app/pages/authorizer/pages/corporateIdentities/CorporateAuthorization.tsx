import React from 'react'
import { Box } from '@mui/material'
import { AuthorizerView } from 'app/pages/authorizer/components/AuthorizerView'
import { AppFeature } from 'types/app'
import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'

export const CorporateAuthorization = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <AuthorizerView
          title={data.companyLegalName ?? data.user.name}
          data={data}
          feature={AppFeature.Corporates}
        >
          <Box sx={{ marginTop: '-42px' }}>
            <CorporatesPreview data={data} isForAuthorizer />
          </Box>
        </AuthorizerView>
      )}
    />
  )
}
