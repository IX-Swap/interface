import React from 'react'
import { Step } from '@mui/material'
import { useSetup2fa } from 'app/pages/security/pages/setup2fa/hooks/useSetup2fa'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons/ChangeStepButtons'
import { Layout2fa } from 'app/pages/security/components/Layout2fa/Layout2fa'
import { StepButton } from 'ui/Stepper/StepButton'
import { Stepper } from 'ui/Stepper/Stepper'
import { use2faSteps } from 'app/pages/security/hooks/use2faSteps'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

const steps = [
  'Download App',
  'Scan QR Code',
  'Backup Key',
  'Enable Authenticator'
]

export const Setup2fa = () => {
  const { data } = useSetup2fa()
  const { isTablet } = useAppBreakpoints()

  const { activeStep, prevStep, nextStep, stepperConditions, stepInfo } =
    use2faSteps(steps)

  const isBackButtonVisible = activeStep > 0 && activeStep < steps.length
  const isNextButtonVisible = activeStep < steps.length - 1

  return (
    <Layout2fa
      content={
        <ActiveStep index={activeStep} twoFaData={data} nextStep={nextStep} />
      }
      stepper={
        <Stepper
          orientation={isTablet ? 'horizontal' : 'vertical'}
          activeStep={activeStep}
          nonLinear
          withMobileDropdown={false}
          title={isTablet ? '2FA Authenticator' : 'Progress'}
          stepInfo={isTablet ? stepInfo : undefined}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={stepperConditions(index).completed}>
              <StepButton
                step={index + 1}
                variantsConditions={stepperConditions(index)}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      }
      buttons={
        <ChangeStepButtons
          isBackButtonVisible={isBackButtonVisible}
          isNextButtonVisible={isNextButtonVisible}
          isContinueButtonVisible={activeStep === 4}
          onBackButtonClick={prevStep}
          onNextButtonClick={nextStep}
        />
      }
    />
  )
}
