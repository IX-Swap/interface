import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'
import { CorporateInvestorForm } from 'app/pages/_identity/components/CorporateInvestorForm/CorporateInvestorForm'

export const CreateInvestor = () => {
  const { showPreIdentityCreateDialog } = useOnboardingDialog()

  useEffect(() => {
    showPreIdentityCreateDialog('corporate')
    // eslint-disable-next-line
  }, [])

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <CorporateInvestorForm />
      </Grid>
    </Grid>
  )
}
