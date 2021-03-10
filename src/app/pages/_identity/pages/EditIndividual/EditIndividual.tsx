import React from 'react'
import { Grid } from '@material-ui/core'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'
import { IndividualInvestorForm } from 'app/pages/_identity/components/IndividualInvestorForm/IndividualInvestorForm'

export const EditIndividual = () => {
  const { data, status } = useIndividualIdentity()

  useSetPageTitle(getPersonName(data))

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <IndividualInvestorForm />
      </Grid>
    </Grid>
  )
}
