import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/_identity/containers/CorporateIdentityContainer'

export const EditInvestor: React.FC = () => {
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
            <CorporateInvestorForm />
          </Grid>
        </Grid>
      )}
    />
  )
}
