import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'

export const ViewInvestor = () => {
  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <Grid container>
          <Grid item xs={12}>
            <PageHeader title={data.companyLegalName} />
          </Grid>
          <Grid item xs={12}>
            <RejectionMessage data={data} />
          </Grid>
          <Grid
            xs={12}
            container
            item
            justifyContent='flex-end'
            alignItems='center'
          >
            <EditButton
              link={IdentityRoute.editCorporate}
              params={{ identityId: data._id, userId: data.user._id }}
            />
          </Grid>
          <Grid item xs={12} container>
            <VSpacer size='small' />
          </Grid>
          <Grid item xs={12}>
            <CorporateIdentityView data={data} />
          </Grid>
        </Grid>
      )}
    />
  )
}
