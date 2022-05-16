import React from 'react'
import { CorporateIssuerView } from 'app/pages/identity/components/CorporateIssuerView/CorporateIssuerView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { RootContainer } from 'ui/RootContainer'

export const ViewIssuer = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <Grid container style={{ display: 'table' }}>
          <Grid item xs={12}>
            <PageHeader title={data.companyLegalName} />
          </Grid>
          <RootContainer>
            <Grid
              container
              item
              xs={12}
              justifyContent='flex-end'
              alignItems='center'
            >
              <EditButton
                link={IdentityRoute.editIssuer}
                params={{ identityId: data._id, userId: data.user._id }}
              />
            </Grid>
            <Grid item xs={12}>
              <CorporateIssuerView data={data} />
            </Grid>
          </RootContainer>
        </Grid>
      )}
    />
  )
}
