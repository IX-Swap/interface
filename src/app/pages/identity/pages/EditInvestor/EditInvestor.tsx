import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { CorporateInvestorForm } from 'app/pages/identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { CorporateIdentity } from 'app/pages/identity/types/forms'

const EditInvestorForm = ({ data }: { data: CorporateIdentity }) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={data.companyLegalName} />
      </Grid>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <CorporateInvestorForm data={data} />
      </Grid>
    </Grid>
  )
}

export const EditInvestor: React.FC = () => {
  return <CorporateIdentityContainer component={EditInvestorForm} />
}
