import React from 'react'
import { Grid, Box, Hidden } from '@material-ui/core'
import IdentityOverview from './components/IdentityOverview'
import ProgressCard from './components/ProgressCard'
import IdentityProgress from 'pages/identity/components/IdentityProgress'
import { useIdentityState, IDENTITY_STATUS, selectFile } from 'context/IdentityContext'
import FinancialsProgress from 'pages/identity/components/FinancialsProgress/FinancialsProgress'
import { useAccreditationState, ACCREDITATION_STATUS } from 'context/AccreditationContext'
import AccreditationProgress from 'pages/identity/components/AccreditationProgress/AccreditationProgress'

export default function IdentityDashboard () {
  const {
    isProgressReady,
    identityProgress,
    financialsProgress,
    accreditationProgress,
    areAllCompleted,
    error
  } = useIdentityDashboardLogic()

  const progressesJsx =
    <>
      <ProgressCard
        completed
        to={`/app/identity/identification-steps/${identityProgress.activeStep + 2}`}
        title='Identification'
        component={IdentityProgress}
        {...identityProgress}
      />
      <Box mt={3}>
        <ProgressCard
          completed
          to={`/app/identity/financials-steps/${financialsProgress.activeStep + 2}`}
          title='Financials'
          component={FinancialsProgress}
          {...financialsProgress}
        />
      </Box>
      <Box mt={3}>
        <ProgressCard
          completed
          to={`/app/identity/accreditation-steps/${accreditationProgress.activeStep + 2}`}
          title='Accreditation'
          component={AccreditationProgress}
          {...accreditationProgress}
        />
      </Box>
    </>

  return (
    <Grid component='article' container spacing={3} justify='center'>
      {isProgressReady && !error && !areAllCompleted && (
        <Grid item xs={12}>
          <Hidden mdUp>{progressesJsx}</Hidden>
        </Grid>
      )}

      <Grid component='section' item xs={12} md={7}>
        <IdentityOverview areAllCompleted={areAllCompleted} />
      </Grid>

      {isProgressReady && !error && !areAllCompleted && (
        <Grid item xs={12} md={5}>
          <Hidden smDown>{progressesJsx}</Hidden>
        </Grid>
      )}
    </Grid>
  )
}

const useIdentityDashboardLogic = () => {
  const id = useIdentityState()
  const acrd = useAccreditationState()
  const { status: idStatus, identity } = id
  const { status: accreditationStatus, accreditation } = acrd

  const error = id.error.get || acrd.error.get

  // calculate if page is ready (i.e. completed all network requests)
  const isIDReady =
    ![IDENTITY_STATUS.INIT, IDENTITY_STATUS.GETTING].includes(idStatus)
  const isAccreditationReady =
    ![ACCREDITATION_STATUS.INIT, ACCREDITATION_STATUS.GETTING].includes(accreditationStatus)
  const isProgressReady = isIDReady && isAccreditationReady

  // calculate progress of identity steps
  const identityProgress = {
    activeStep: identity?.idNumber
      ? 2
      : identity?.address?.line1
      ? 1
      : identity?.firstName
      ? 0
      : -1,
    percentage: identity?.idNumber
      ? 100
      : identity?.address?.line1
      ? 66
      : identity?.firstName
      ? 33
      : 0
  }

  // calculate progress of financials steps
  const financialsProgress = {
    activeStep: identity?.annualIncome
      ? 2
      : identity?.bankName
      ? 1
      : identity?.occupation
      ? 0
      : -1,
    percentage: identity?.annualIncome
      ? 100
      : identity?.bankName
      ? 66
      : identity?.occupation
      ? 33
      : 0
  }

  // calculate progress of accreditation steps
  const totalPersonalAssetExceedsTwoMillionSGD =
    accreditation?.accreditationDetails?.totalPersonalAssetExceedsTwoMillionSGD
  const accreditationProgress = {
    activeStep: selectFile(id, 'Proof of Wealth')
      ? 2
      : typeof totalPersonalAssetExceedsTwoMillionSGD === 'boolean'
      ? 1
      : typeof accreditation?.selfAccreditedInvestor === 'boolean'
      ? 0
      : -1,
    percentage: selectFile(id, 'Proof of Wealth')
      ? 100
      : typeof totalPersonalAssetExceedsTwoMillionSGD === 'boolean'
      ? 66
      : typeof accreditation?.selfAccreditedInvestor === 'boolean'
      ? 33
      : 0
  }

  const areAllCompleted = identityProgress.percentage === 100
    && financialsProgress.percentage === 100
    && accreditationProgress.percentage === 100

  return {
    isProgressReady,
    identityProgress,
    financialsProgress,
    accreditationProgress,
    areAllCompleted,
    error
  }
}
