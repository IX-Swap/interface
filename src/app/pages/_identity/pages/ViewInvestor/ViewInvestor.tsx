import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporateIdentities } from 'hooks/identity/useAllCorporateIdentities'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { EditButton } from 'app/pages/identity/components/EditButton'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'

export const ViewInvestor = () => {
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
        <RejectionMessage data={identity} />
      </Grid>
      <Grid container item justify='flex-end' alignItems='center'>
        <EditButton link={paths.editCorporate} params={{ identityId }} />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <CorporateIdentityView data={identity} />
      </Grid>
    </Grid>
  )
}
