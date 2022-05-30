import React, { useEffect, useState } from 'react'
import { Step } from '@mui/material'
import { TwoFaData } from 'app/pages/security/types'
import { ActiveStep } from 'app/pages/security/pages/update2fa/components/ActiveStep'
import { ChangeStepButtons } from 'app/pages/security/components/ChangeStepButtons/ChangeStepButtons'
import { useAuth } from 'hooks/auth/useAuth'
import { history } from 'config/history'
import { SecurityRoute } from 'app/pages/security/router/config'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'
import { Layout2fa } from 'app/pages/security/components/Layout2fa/Layout2fa'
import { use2faSteps } from 'app/pages/security/hooks/use2faSteps'

const steps = [
  'Remove Authenticator',
  'Scan QR Code',
  'Backup Key',
  'Enable Authenticator'
]

export const Update2fa = () => {
  const [twoFaData, setTwoFaData] = useState<TwoFaData | undefined>(undefined)
  const { user } = useAuth()

  const {
    activeStep,
    nextStep,
    prevStep,
    stepInfo,
    isMobile,
    is2faCompleted,
    stepperConditions
  } = use2faSteps(steps)

  useEffect(() => {
    if (user !== undefined && !user.totpConfirmed) {
      history.push(SecurityRoute.setup2fa)
    }
    // eslint-disable-next-line
  }, [])

  const isBackButtonVisible = activeStep > 0 && activeStep < steps.length
  const isNextButtonVisible = activeStep < steps.length - 1 && activeStep > 0

  const handleSuccessfulFirstStep = (newTwoFaData: TwoFaData) => {
    setTwoFaData(newTwoFaData)
    nextStep()
  }

  return (
    <Layout2fa
      content={
        <ActiveStep
          twoFaData={twoFaData}
          handleSuccessfulRemoveAuthenticator={handleSuccessfulFirstStep}
          index={activeStep}
          nextStep={nextStep}
        />
      }
      stepper={
        <Stepper
          orientation={isMobile ? 'horizontal' : 'vertical'}
          activeStep={activeStep}
          nonLinear
          withMobileDropdown={false}
          title={isMobile ? '2FA Authenticator' : 'Progress'}
          stepInfo={stepInfo}
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
          update2FA
          isBackButtonVisible={isBackButtonVisible}
          isNextButtonVisible={isNextButtonVisible}
          isContinueButtonVisible={is2faCompleted}
          onBackButtonClick={prevStep}
          onNextButtonClick={nextStep}
        />
      }
    />
  )
}
