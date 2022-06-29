import React from 'react'
import { Grid, Paper } from '@mui/material'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { CorporateIdentityView } from 'app/pages/identity/components/CorporateIdentityView/CorporateIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CorporateIdentityContainer } from 'app/pages/identity/containers/CorporateIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/components/FormStepper/FormStepper.styles'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'

export const getTitleText = (type: string) => {
  if (type === 'issuer') {
    return 'View Corporate Issuer Identity'
  }

  return 'View Corporate Investor Identity'
}

export const ViewInvestor = () => {
  const classes = useStyles()
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
            <PageHeader title={getTitleText(data.type)} />
          </Grid>
          <RootContainer>
            <Grid container className={classes.wrapper}>
              <Grid item xs={12}>
                <RejectionMessage data={data} />
              </Grid>

              <Grid item className={classes.content}>
                <CorporateIdentityView data={data} />
              </Grid>

              <Grid container item className={classes.rightBlock}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <EditButton
                      fullWidth
                      variant={'contained'}
                      link={editLinkMap[data.type]}
                      params={{ identityId: data._id, userId: data.user._id }}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <TwoFANotice />
                </Grid>
              </Grid>
            </Grid>
          </RootContainer>
        </Grid>
      )}
    />
  )
}
