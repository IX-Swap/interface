import React from 'react'
import { Step2Scan } from 'app/pages/security/components/Step2Scan/Step2Scan'
import { Step3Backup } from 'app/pages/security/components/Step3Backup/Step3Backup'
import { Step4Enable } from 'app/pages/security/components/Step4Enable'
import { Enabled } from 'app/pages/security/components/Enabled'
import { TwoFaData } from 'app/pages/security/types'
import { Step1Download } from 'app/pages/security/pages/setup2fa/components/Step1Download'

export interface ActiveStepProps {
  index: number
  twoFaData: TwoFaData | undefined
  nextStep: () => void
}

export const ActiveStep = ({ index, twoFaData, nextStep }: ActiveStepProps) => {
  switch (index) {
    case 0:
      return <Step1Download />
    case 1:
      return <Step2Scan twoFaData={twoFaData} />
    case 2:
      return <Step3Backup twoFaData={twoFaData} />
    case 3:
      return <Step4Enable nextStep={nextStep} />
    default:
      return <Enabled />
  }
}
