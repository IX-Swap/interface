import React from 'react'
import { CorporateIssuerView } from 'app/pages/_identity/components/CorporateIssuerView/CorporateIssuerView'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@material-ui/core'
import { CorporateIdentityContainer } from 'app/pages/_identity/containers/CorporateIdentityContainer'

export const ViewIssuer = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <Grid container>
          <Grid item xs={12}>
            <PageHeader title={data.companyLegalName} />
          </Grid>
          <Grid item xs={12}>
            <CorporateIssuerView data={data} />
          </Grid>
        </Grid>
      )}
    />
  )
}
