import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'app/pages/identity/components/CancelButton'
import { useIdentitiesRouter } from 'app/pages/identity/router'
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
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={undefined}
          isNew={true}
          submitButtonText='Create'
          cancelButton={<CancelButton link={paths.individual} />}
        />
      </Grid>
    </Grid>
  )
}
