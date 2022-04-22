import { useOnboardingSteps } from 'app/hooks/onboarding/useOnboardingSteps'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import React from 'react'

export const CorporateOnboardingSteps = () => {
  const { steps, activeStep } = useOnboardingSteps('corporate')
  return <OnboardingSteps steps={steps} activeStep={activeStep} />
}
