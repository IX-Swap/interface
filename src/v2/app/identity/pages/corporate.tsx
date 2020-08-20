import React from 'react'
import CorporateIdentityForm from 'v2/app/components/identity-forms/corporate'
import { useStore } from 'v2/app/identity/context'
import { Redirect } from 'react-router-dom'
import PageTitle from 'v2/app/components/page-title'
import { Grid } from '@material-ui/core'

const CorporateIdentityPreview = () => {
  const identityStore = useStore()

  if (!identityStore.activeCorporateIdentity) return <Redirect to='./' />

  return (
    <Grid container>
      <Grid item>
        <PageTitle
          subPage
          title={identityStore.activeCorporateIdentity.companyLegalName}
        />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          identity={identityStore.activeCorporateIdentity}
          editMode
          useOwnEmail={false}
        />
      </Grid>
    </Grid>
  )
}

export default CorporateIdentityPreview
