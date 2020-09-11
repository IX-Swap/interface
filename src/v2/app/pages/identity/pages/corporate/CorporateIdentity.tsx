import React from 'react'
import PageTitle from 'v2/app/components/page-title'
import { Grid } from '@material-ui/core'
import { CorporateIdentityForm } from 'v2/app/pages/identity/components/CorporateIdentityForm'
import { corporate } from '__fixtures__/authorizer'
import { useIndividualIdentity } from 'v2/hooks/identity/useIndividualIdentity'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { useParams } from 'react-router-dom'

export const CorporateIdentity: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const { identityId } = useParams<{ identityId: string }>()

  if (status === 'loading' || data === undefined) {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid item>
        <PageTitle subPage title={identity.companyLegalName} />
      </Grid>
      <Grid item>
        <CorporateIdentityForm
          identity={identity}
          editMode
          useOwnEmail={false}
        />
      </Grid>
    </Grid>
  )
}
