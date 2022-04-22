import { useOnboardingSteps } from 'app/hooks/onboarding/useOnboardingSteps'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import React from 'react'

export const IssuerOnboardingSteps = () => {
  const { steps, activeStep } = useOnboardingSteps('corporate', true)
  return <OnboardingSteps steps={steps} activeStep={activeStep} />
}
