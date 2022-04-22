import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/hooks/onboarding/PageHeader/PageHeader'
import { getPersonName } from 'helpers/strings'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'

export const ViewIndividual = () => {
  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <Grid container>
          <Grid item xs={12}>
            <PageHeader title={getPersonName(data)} />
          </Grid>
          <Grid item xs={12}>
            <RejectionMessage data={data} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent='flex-end'
            alignItems='center'
          >
            <EditButton
              link={IdentityRoute.editIndividual}
              params={{ identityId: data._id, userId: data.user._id }} // TODO: ask backend to unify user field for all objects
            />
          </Grid>
          <Grid item container xs={12}>
            <VSpacer size='small' />
          </Grid>
          <Grid item xs={12}>
            <IndividualIdentityView data={data} />
          </Grid>
        </Grid>
      )}
    />
  )
}
