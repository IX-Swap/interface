import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { EditButton } from 'app/pages/identity/components/EditButton'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { useParams } from 'react-router-dom'

export const ViewInvestor = () => {
  const { data, status } = useAllCorporates({})
  const { identityId } = useParams<{ identityId: string }>()

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
        <EditButton
          link={IdentityRoute.editCorporate}
          params={{ identityId }}
        />
      </Grid>
      <Grid item container>
        <VSpacer size='small' />
      </Grid>
      <Grid item>
        <CorporateIdentityView />
      </Grid>
    </Grid>
  )
}
