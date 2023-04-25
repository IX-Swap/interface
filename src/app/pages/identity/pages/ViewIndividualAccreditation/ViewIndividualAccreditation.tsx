import React from 'react'
import { Grid, Paper } from '@mui/material'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/components/FormStepper/FormStepper.styles'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'
import { IndividualAccreditationContainer } from '../../containers/IndividualAccreditationContainer'
import { IndividualAccreditationView } from '../../components/IndividualAccreditationView/IndividualAccreditationView'

export const ViewIndividualAccreditation = () => {
  const classes = useStyles()

  return (
    <IndividualAccreditationContainer
      component={({ data }) => (
        <Grid container style={{ display: 'table' }}>
          <Grid item xs={12}>
            <PageHeader title='View Individual Investor Accreditation' />
          </Grid>
          <RootContainer>
            <Grid container className={classes.wrapper}>
              <Grid item xs={12}>
                <RejectionMessage data={data} />
              </Grid>

              <Grid item className={classes.content}>
                <IndividualAccreditationView data={data} />
              </Grid>

              <Grid container item className={classes.rightBlock}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 4, borderRadius: 2 }}>
                    <EditButton
                      fullWidth
                      variant={'contained'}
                      link={IdentityRoute.editCorporateAccreditation}
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
