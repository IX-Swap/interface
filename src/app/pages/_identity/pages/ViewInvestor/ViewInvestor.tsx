import React from 'react'
import { Grid } from '@material-ui/core'
import { useAllCorporates } from 'app/pages/_identity/hooks/useAllCorporates'
import { EditButton } from 'app/pages/identity/components/EditButton'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/_identity/components/CorporateIdentityView/CorporateIdentityView'
import { IdentityRoute } from 'app/pages/_identity/router/config'
import { useParams } from 'react-router-dom'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const ViewInvestor = () => {
  const { data, status } = useAllCorporates({})
  const { identityId, userId } = useParams<{
    identityId: string
    userId: string
  }>()

  if (status === 'loading') {
    return null
  }

  const identity = data.map[identityId]

  return (
    <Grid container>
      <Grid item xs={12}>
        <PageHeader title={identity.companyLegalName} />
      </Grid>
      <Grid item xs={12}>
        <RejectionMessage data={identity} />
      </Grid>
      <Grid xs={12} container item justify='flex-end' alignItems='center'>
        <EditButton
          link={IdentityRoute.editCorporate}
          params={{ identityId, userId }}
        />
      </Grid>
      <Grid item xs={12} container>
        <VSpacer size='small' />
      </Grid>
      <Grid item xs={12}>
        <CorporateIdentityView />
      </Grid>
    </Grid>
  )
}
