import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CorporateIssuerForm } from 'app/pages/_identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/_identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'types/identity'

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
