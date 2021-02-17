import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'app/pages/identity/components/CancelButton'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { VSpacer } from 'components/VSpacer'
import { TaxDeclarationForm } from 'app/pages/identity/components/TaxDeclarationForm/TaxDeclarationForm'

export const IndividualIdCreate: React.FC = () => {
  const { paths } = useIdentitiesRouter()

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <TaxDeclarationForm />
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
