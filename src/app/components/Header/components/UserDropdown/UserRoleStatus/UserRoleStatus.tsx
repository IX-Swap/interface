import React from 'react'
import { Typography } from '@mui/material'
import { useOnboardingJourneys } from 'app/hooks/onboarding/useOnboardingJourneys'
import { useStyles } from 'app/components/Header/components/UserDropdown/UserRoleStatus/UserRoleStatus.styles'

export const UserRoleStatus = () => {
  const classes = useStyles()

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
    <Typography variant={'body2'} className={classes.wrapper}>
      {status}
    </Typography>
  )
}
