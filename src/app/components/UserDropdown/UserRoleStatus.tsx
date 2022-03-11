import React from 'react'
import { Typography } from '@mui/material'
import { useOnboardingJourneys } from 'app/components/OnboardingPanel/hooks/useOnboardingJourneys'

export const UserRoleStatus = () => {
  const {
    isIndividualJourneyCompleted,
    isCorporateJourneyCompleted,
    corporateIdentities
  } = useOnboardingJourneys()

  const getUserRoleStatus = () => {
    if (isIndividualJourneyCompleted) {
      return 'Individual Investor'
    }

    if (
      isCorporateJourneyCompleted &&
      corporateIdentities[0].type === 'investor'
    ) {
      return 'Corporate Investor'
    }

    if (
      isCorporateJourneyCompleted &&
      corporateIdentities[0].type === 'issuer'
    ) {
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
