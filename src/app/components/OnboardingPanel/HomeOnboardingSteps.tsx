import { useHomeOnboardingSteps } from 'app/hooks/onboarding/useHomeOnboardingSteps'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import React from 'react'

export const HomeOnboardingSteps = () => {
  const { steps, activeStep } = useHomeOnboardingSteps()
  return <OnboardingSteps steps={steps} activeStep={activeStep} />
}
