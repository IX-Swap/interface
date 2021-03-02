import { useOnboardingSteps } from 'app/components/OnboardingPanel/hooks/useOnboardingSteps'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import React from 'react'

export const HomeOnboardingSteps = () => {
  const { steps, activeStep } = useOnboardingSteps()
  return <OnboardingSteps steps={steps} activeStep={activeStep} />
}
