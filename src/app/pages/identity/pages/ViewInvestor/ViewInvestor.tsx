import React from 'react'
import { Grid } from '@mui/material'
import { VSpacer } from 'components/VSpacer'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { RootContainer } from 'ui/RootContainer'

export const ViewInvestor = () => {
  const editLinkMap = {
    investor: IdentityRoute.editCorporate,
    'Fund Manager': IdentityRoute.editFundManager,
    'Fund Administrator': IdentityRoute.editFundAdmin,
    'Portfolio Manager': IdentityRoute.editPortfolioManager,
    issuer: IdentityRoute.editIssuer
  }

  return (
    <CorporateIdentityContainer
      component={({ data }) => (
        <Grid container style={{ display: 'table' }}>
          <Grid item xs={12}>
            <PageHeader title={data.companyLegalName} />
          </Grid>
          <RootContainer>
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
                link={editLinkMap[data.type]}
                params={{ identityId: data._id, userId: data.user._id }}
              />
            </Grid>
            <Grid item xs={12} container>
              <VSpacer size='small' />
            </Grid>
            <Grid item xs={12}>
              <CorporateIdentityView data={data} />
            </Grid>
          </RootContainer>
        </Grid>
      )}
    />
  )
}
