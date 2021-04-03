import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CorporateIssuerForm } from 'app/pages/identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'

export const EditIssuer: React.FC = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <Grid container>
          <Grid item xs={12}>
            <PageHeader title={data.companyLegalName} />
          </Grid>
          <Grid container item xs={12}>
            <VSpacer size='medium' />
          </Grid>
          <Grid item xs={12}>
            <CorporateIssuerForm data={data} />
          </Grid>
        </Grid>
      )}
    />
  )
}
