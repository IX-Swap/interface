import React from 'react'
import { Typography } from '@mui/material'
// import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { useStyles } from 'app/components/NewHeader/components/UserDropdown/UserRoleStatus/UserRoleStatus.styles'

export const UserRoleStatus = () => {
  const classes = useStyles()

  // TODO Remove mocked values and uncomment this after demo
  // const {
  //   isIndividualJourneyCompleted,
  //   isInvestorJourneyCompleted,
  //   isIssuerJourneyCompleted
  // } = useOnboardingJourneys()

  const isIndividualJourneyCompleted = true
  const isInvestorJourneyCompleted = false
  const isIssuerJourneyCompleted = false

  const getUserRoleStatus = () => {
    if (isInvestorJourneyCompleted && isIssuerJourneyCompleted) {
      return 'Issuer/Investor'
    }

    if (isIndividualJourneyCompleted) {
      return 'Individual Investor'
    }

    if (isInvestorJourneyCompleted) {
      return 'Corporate Investor'
    }

    if (isIssuerJourneyCompleted) {
      return 'Corporate Issuer'
    }

    return null
  }

  const status = getUserRoleStatus()

  if (status === null) {
    return null
  }

  return (
    <Typography variant={'body2'} className={classes.wrapper}>
      {status}
    </Typography>
  )
}
