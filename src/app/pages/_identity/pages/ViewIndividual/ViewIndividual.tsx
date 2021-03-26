import React from 'react'
import { Grid } from '@material-ui/core'
import { useIndividualIdentity } from 'hooks/identity/useIndividualIdentity'
import { EditButton } from 'app/pages/identity/components/EditButton'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { IndividualIdentityViewContainer } from 'app/pages/_identity/components/IndividualIdentityView/IndividualIdentityViewContainer'

export const ViewIndividual = () => {
  const { data, status } = useIndividualIdentity()
  const { paths } = useIdentitiesRouter()

  if (status === 'loading' || data === undefined) {
    return null
  }

  return (
    <Grid container>
      <Grid item>
        <RejectionMessage data={data} />
      </Grid>
      <Grid container item justify='flex-end' alignItems='center'>
        <EditButton
          link={paths.editIndividual}
          params={{ identityId: data._id }}
        />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <IndividualIdentityViewContainer />
      </Grid>
    </Grid>
  )
}
