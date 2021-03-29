import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { getPersonName } from 'helpers/strings'
import { IndividualInvestorForm } from 'app/pages/_identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IndividualIdentityContainer } from 'app/pages/_identity/containers/IndividualIdentityContainer'

export const EditIndividual = () => {
  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <Grid container>
          <Grid container item xs={12}>
            <PageHeader title={getPersonName(data)} />
          </Grid>
          <Grid container item>
            <VSpacer size='medium' />
          </Grid>
          <Grid item xs={12}>
            <IndividualInvestorForm />
          </Grid>
        </Grid>
      )}
    />
  )
}
