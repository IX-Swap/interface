import React from 'react'
import { Grid } from '@material-ui/core'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { VSpacer } from 'components/VSpacer'
import { getPersonName } from 'helpers/strings'
import { IndividualInvestorForm } from 'app/pages/_identity/components/IndividualInvestorForm/IndividualInvestorForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const EditIndividual = () => {
  const { data, status } = useIndividualIdentity()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
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
  )
}
