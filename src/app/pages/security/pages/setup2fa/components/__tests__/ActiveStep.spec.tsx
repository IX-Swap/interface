import React from 'react'
import { render } from 'test-utils'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'
import { Step1Download } from 'app/pages/security/pages/setup2fa/components/Step1Download'
import { Step2Scan } from 'app/pages/security/components/Step2Scan/Step2Scan'
import { Step3Backup } from 'app/pages/security/components/Step3Backup/Step3Backup'
import { Step4Enable } from 'app/pages/security/components/Step4Enable'
import { Enabled } from 'app/pages/security/components/Enabled'
import { fakeTwoFaData } from '__fixtures__/security'

jest.mock('app/pages/security/pages/setup2fa/components/Step1Download', () => ({
  Step1Download: jest.fn(() => null)
}))
jest.mock('app/pages/security/components/Step2Scan/Step2Scan', () => ({
  Step2Scan: jest.fn(() => null)
}))
jest.mock('app/pages/security/components/Step3Backup/Step3Backup', () => ({
  Step3Backup: jest.fn(() => null)
}))
jest.mock('app/pages/security/components/Step4Enable', () => ({
  Step4Enable: jest.fn(() => null)
}))
jest.mock('app/pages/security/components/Enabled', () => ({
  Enabled: jest.fn(() => null)
}))

describe('ActiveStep', () => {
  const nextStep = jest.fn()
  const handleSuccessfulRemoveAuthenticator = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Step1Download if activeStep is 0', () => {
    render(
      <ActiveStep
        index={0}
        nextStep={nextStep}
        twoFaData={fakeTwoFaData}
        handleSuccessfulRemoveAuthenticator={
          handleSuccessfulRemoveAuthenticator
        }
      />
    )

    expect(Step1Download).toHaveBeenCalledTimes(1)
  })

  it('renders Step2Scan if activeStep is 1', () => {
    render(
      <ActiveStep
        index={1}
        nextStep={nextStep}
        twoFaData={fakeTwoFaData}
        handleSuccessfulRemoveAuthenticator={
          handleSuccessfulRemoveAuthenticator
        }
      />
    )

    expect(Step2Scan).toHaveBeenCalledTimes(1)
  })

  it('renders Step3Backup if activeStep is 2', () => {
    render(
      <ActiveStep
        index={2}
        nextStep={nextStep}
        twoFaData={fakeTwoFaData}
        handleSuccessfulRemoveAuthenticator={
          handleSuccessfulRemoveAuthenticator
        }
      />
    )

    expect(Step3Backup).toHaveBeenCalledTimes(1)
  })

  it('renders Step4Enable if activeStep is 3', () => {
    render(
      <ActiveStep
        index={3}
        nextStep={nextStep}
        twoFaData={fakeTwoFaData}
        handleSuccessfulRemoveAuthenticator={
          handleSuccessfulRemoveAuthenticator
        }
      />
    )

    expect(Step4Enable).toHaveBeenCalledTimes(1)
  })

  it("renders Enabled if activeStep doesn't match", () => {
    render(
      <ActiveStep
        index={4}
        nextStep={nextStep}
        twoFaData={fakeTwoFaData}
        handleSuccessfulRemoveAuthenticator={
          handleSuccessfulRemoveAuthenticator
        }
      />
    )

    expect(Enabled).toHaveBeenCalledTimes(1)
  })
})
