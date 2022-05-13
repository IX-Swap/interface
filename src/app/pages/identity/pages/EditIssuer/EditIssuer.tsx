import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { CorporateIssuerForm } from 'app/pages/identity/components/CorporateIssuerForm/CorporateIssuerForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'
import { RootContainer } from 'ui/RootContainer'

const EditIssuerForm = ({ data }: { data: CorporateIdentity }) => (
  <Grid container style={{ display: 'table' }}>
    <Grid item xs={12}>
      <PageHeader title={data.companyLegalName} />
    </Grid>
    <RootContainer>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateIssuerForm data={data} />
      </Grid>
    </RootContainer>
  </Grid>
)

export const EditIssuer: React.FC = () => {
  return <CorporateIdentityContainer component={EditIssuerForm} />
}
