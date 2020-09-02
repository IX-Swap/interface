import React from 'react'
import { Redirect } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import IndividualIdentityForm from 'v2/app/components/identity-forms/individual'
import { useStore } from 'v2/app/pages/identity/context'
import PageTitle from 'v2/app/components/page-title'

const IndividualIdentityPreview = () => {
  const identityStore = useStore()

  if (!identityStore.activeIndividualIdentity) return <Redirect to='./' />
  const name = `${identityStore.activeIndividualIdentity.firstName} ${identityStore.activeIndividualIdentity.lastName}`
  return (
    <Grid container>
      <Grid item>
        <PageTitle subPage title={name} />
      </Grid>
      <Grid item>
        <IndividualIdentityForm
          identity={identityStore.activeIndividualIdentity}
          editMode
          useOwnEmail={false}
        />
      </Grid>
    </Grid>
  )
}

export default IndividualIdentityPreview
