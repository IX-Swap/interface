import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { CorporateIssuerForm } from 'app/pages/identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

const EditIssuerForm = ({ data }: { data: CorporateIdentity }) => (
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
)

export const EditIssuer: React.FC = () => {
  return <CorporateIdentityContainer component={EditIssuerForm} />
}
