import React from 'react'
import { Grid, Paper } from '@mui/material'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/components/FormStepper/FormStepper.styles'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'

export const ViewIndividual = () => {
  const classes = useStyles()

  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <Grid container style={{ display: 'table' }}>
          <Grid item xs={12}>
            <PageHeader title={'View Individual Investor Identity'} />
          </Grid>
          <RootContainer>
            <Grid container className={classes.wrapper}>
              <Grid item xs={12}>
                <RejectionMessage data={data} />
              </Grid>

              <Grid item className={classes.content}>
                <IndividualIdentityView data={data} />
              </Grid>

              <Grid container item className={classes.rightBlock}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <EditButton
                      fullWidth
                      variant={'contained'}
                      link={IdentityRoute.editIndividual}
                      params={{ identityId: data._id, userId: data.user._id }} // TODO: ask backend to unify user field for all objects
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
