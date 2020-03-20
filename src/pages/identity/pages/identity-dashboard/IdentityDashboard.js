import React from 'react'
import { Grid, Box, Hidden } from '@material-ui/core'
import IdentityOverview from './components/IdentityOverview'
import ProgressCard from './components/ProgressCard'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import { useIdentityState, IDENTITY_STATUS } from 'context/IdentityContext'
import FinancialsProgress from 'pages/identity/components/FinancialsProgress/FinancialsProgress'

export default function IdentityDashboard () {
  const {
    isProgressReady,
    identityProgress,
    financialsProgress
  } = useIdentityDashboardLogic()

  const idProgressJsx =
    <ProgressCard
      to={`/app/identity/identification-steps/${identityProgress.activeStep + 2}`}
      title='Identification'
      component={IdentityProgress}
      {...identityProgress}
    />

  return (
    <Grid component='article' container spacing={3}>
      <Grid item xs={12}>
        {isProgressReady &&
          <Hidden mdUp>
            {idProgressJsx}
          </Hidden>}
      </Grid>
      <Grid component='section' item xs={12} md={7}>
        <IdentityOverview />
      </Grid>
      <Grid item xs={12} md={5}>
        {isProgressReady &&
          <>
            <Hidden smDown>
              {idProgressJsx}
            </Hidden>
            <Box mt={3}>
              <ProgressCard
                to='/app/identity/financials-steps/1'
                title='Financials'
                component={FinancialsProgress}
                {...financialsProgress}
              />
            </Box>
            <Box mt={3}>
              <ProgressCard
                to='/app/identity'
                title='Accreditation'
                component={IdentityProgress}
                activeStep={-1}
                percentage='0'
              />
            </Box>
            <Box mt={3}>
              <ProgressCard
                to='/app/identity'
                title='Confirmation'
                component={IdentityProgress}
                activeStep={-1}
                percentage='0'
              />
            </Box>
          </>}
      </Grid>
    </Grid>
  )
}

const useIdentityDashboardLogic = () => {
  const { status, identity } = useIdentityState()

  const isProgressReady = ![IDENTITY_STATUS.INIT, IDENTITY_STATUS.GETTING].includes(status)

  // TODO: Handle returning 100% when appropriate
  const identityProgress = {
    activeStep: identity?.address?.line1 ? 1 : identity?.firstName ? 0 : -1,
    percentage: identity?.address?.line1 ? 66 : identity?.firstName ? 33 : 0
  }

  const financialsProgress = {
    activeStep: identity?.annualIncome ? 2
      : identity?.bankName ? 1
      : identity?.occupation ? 0
      : -1,
    percentage: identity?.annualIncome ? 100
      : identity?.bankName ? 66
      : identity?.occupation ? 33
      : 0
  }

  return { isProgressReady, identityProgress, financialsProgress }
}
