import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { IndividualInvestorForm } from 'app/pages/_identity/components/IndividualInvestorForm/IndividualInvestorForm'

export const CreateIndividual: React.FC = () => {
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    showPreIdentityCreateDialog('individual')
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container>
      <Grid container item xs={12}>
        <VSpacer size='medium' />
      </Grid>
      <Grid item xs={12}>
        <IndividualInvestorForm />
      </Grid>
    </Grid>
  )
}
