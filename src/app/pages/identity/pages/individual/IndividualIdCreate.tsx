import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useOnboardingDialog } from 'app/components/OnboardingDialog/hooks/useOnboardingDialog'

export const IndividualIdCreate: React.FC = () => {
  const { paths } = useIdentitiesRouter()
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
        <CreateIndividual />
      </Grid>
    </Grid>
  )
}
