import React from 'react'
import { Step1RemoveAuthenticator } from 'app/pages/security/pages/update2fa/components/Step1RemoveAuthenticator'
import { Step2Scan } from 'app/pages/security/pages/update2fa/components/Step2Scan/Step2Scan'
import { Step3Backup } from 'app/pages/security/pages/update2fa/components/Step3Backup/Step3Backup'
import { Step4Enable } from 'app/pages/security/components/Step4Enable'
import { Enabled } from 'app/pages/security/pages/update2fa/components/Enabled/Enabled'
import { TwoFaData } from 'app/pages/security/types'

export interface ActiveStepProps {
  index: number
  twoFaData: TwoFaData | undefined
  nextStep: () => void
  handleSuccessfulRemoveAuthenticator: (twoFaData: TwoFaData) => void
}

export const ActiveStep = ({
  index,
  twoFaData,
  nextStep,
  handleSuccessfulRemoveAuthenticator
}: ActiveStepProps) => {
  switch (index) {
    case 0:
      return (
        <Step1RemoveAuthenticator
          onSuccessRemoveAuthenticator={handleSuccessfulRemoveAuthenticator}
        />
      )
    case 1:
      return <Step2Scan twoFaData={twoFaData} />
    case 2:
      return <Step3Backup twoFaData={twoFaData} />
    case 3:
      return <Step4Enable nextStep={nextStep} update2FA />
    default:
      return <Enabled />
  }
}
