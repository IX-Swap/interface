import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporateIdentities } from 'v2/hooks/identity/useAllCorporateIdentities'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { EditButton } from 'v2/app/pages/identity/components/EditButton'
import { VSpacer } from 'v2/components/VSpacer'
import { CorporateView } from 'v2/app/pages/identity/components/CorporateView'
import { RejectionMessage } from 'v2/app/pages/authorizer/components/RejectionMessage'

export const CorporateIdView: React.FC = () => {
  const { data, status } = useAllCorporateIdentities()
  const {
    paths,
    params: { identityId }
  } = useIdentitiesRouter()

  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid item>
        <RejectionMessage data={identity.authorizations} />
      </Grid>
      <Grid container item justify='flex-end' alignItems='center'>
        <EditButton link={paths.editCorporate} params={{ identityId }} />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <CorporateView data={identity} />
      </Grid>
    </Grid>
  )
}
