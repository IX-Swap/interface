import { useOnboardingSteps } from 'app/hooks/onboarding/useOnboardingSteps'
import { OnboardingSteps } from 'app/components/OnboardingPanel/OnboardingSteps'
import React from 'react'

export const IndividualOnboardingSteps = () => {
  const { steps, activeStep } = useOnboardingSteps('individual')
  return <OnboardingSteps steps={steps} activeStep={activeStep} />
}
