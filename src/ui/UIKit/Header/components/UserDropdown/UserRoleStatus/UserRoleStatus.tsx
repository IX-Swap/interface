import React from 'react'
import { Typography } from '@mui/material'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'
import { useStyles } from './UserRoleStatus.styles'

export const UserRoleStatus = () => {
  const classes = useStyles()

  const {
    isIndividualJourneyCompleted,
    isInvestorJourneyCompleted,
    isIssuerJourneyCompleted
  } = useOnboardingJourneys()

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
