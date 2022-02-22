import React from 'react'
import { Typography } from '@mui/material'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

export const UserRoleStatus = () => {
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
    <Typography variant={'body1'} style={{ color: '#666666', marginTop: 3 }}>
      {status}
    </Typography>
  )
}
