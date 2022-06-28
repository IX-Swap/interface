import React from 'react'
import { Grid } from '@mui/material'
import { RejectionMessage } from 'app/pages/authorizer/components/RejectionMessage'
import { IndividualIdentityView } from 'app/pages/identity/components/IndividualIdentityView/IndividualIdentityView'
import { IdentityRoute } from 'app/pages/identity/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { getPersonName } from 'helpers/strings'
import { IndividualIdentityContainer } from 'app/pages/identity/containers/IndividualIdentityContainer'
import { EditButton } from 'app/pages/identity/components/EditButton/EditButton'
import { RootContainer } from 'ui/RootContainer'
import { useStyles } from 'app/components/FormStepper/FormStepper.styles'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { TwoFANotice } from 'app/components/FormStepper/TwoFANotice'

export const ViewIndividual = () => {
  const classes = useStyles()
  const { isMobile, isTablet } = useAppBreakpoints()

  return (
    <IndividualIdentityContainer
      component={({ data }) => (
        <Grid container style={{ display: 'table' }}>
          <Grid item xs={12}>
            <PageHeader title={getPersonName(data)} />
          </Grid>
          <RootContainer>
            <Grid container direction={isTablet ? 'column-reverse' : 'row'}>
              <Grid item xs={12}>
                <RejectionMessage data={data} />
              </Grid>

              <Grid item className={classes.content}>
                <IndividualIdentityView data={data} />
              </Grid>

              <Grid container item className={classes.rightBlock}>
                <Grid item xs={12}>
                  <EditButton
                    fullWidth
                    variant={'contained'}
                    link={IdentityRoute.editIndividual}
                    params={{ identityId: data._id, userId: data.user._id }} // TODO: ask backend to unify user field for all objects
                  />
                </Grid>

                {!isMobile && (
                  <Grid item xs={12}>
                    <TwoFANotice />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </RootContainer>
        </Grid>
      )}
    />
  )
}
