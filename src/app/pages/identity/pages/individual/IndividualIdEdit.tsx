import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualIdentityForm } from 'app/pages/identity/components/IndividualIdentityForm'
import { CancelButton } from 'app/pages/identity/components/CancelButton'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { VSpacer } from 'components/VSpacer'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { getPersonName } from 'helpers/strings'

export const IndividualIdEdit: React.FC = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  useSetPageTitle(getPersonName(data))

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid container item>
        <VSpacer size='medium' />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          data={data}
          submitButtonText='Save'
          cancelButton={<CancelButton link={paths.individual} />}
        />
      </Grid>
    </Grid>
  )
}
