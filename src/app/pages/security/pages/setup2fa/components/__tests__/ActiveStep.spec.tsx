import React from 'react'
import { render } from 'test-utils'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'
import { fakeTwoFaData } from '__fixtures__/security'

jest.mock('app/pages/security/pages/setup2fa/components/Step1Download', () => ({
  Step1Download: jest.fn(() => <div data-testid='step-1' />)
}))
jest.mock('app/pages/security/components/Step2Scan/Step2Scan', () => ({
  Step2Scan: jest.fn(() => <div data-testid='step-2' />)
}))
jest.mock('app/pages/security/components/Step3Backup/Step3Backup', () => ({
  Step3Backup: jest.fn(() => <div data-testid='step-3' />)
}))
jest.mock('app/pages/security/components/Step4Enable', () => ({
  Step4Enable: jest.fn(() => <div data-testid='step-4' />)
}))
jest.mock('app/pages/security/components/Enabled', () => ({
  Enabled: jest.fn(() => <div data-testid='step-5' />)
}))

describe('ActiveStep', () => {
  const nextStep = jest.fn()

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders Step1Download if activeStep is 0', () => {
    const { getByTestId } = render(
      <ActiveStep index={0} nextStep={nextStep} twoFaData={fakeTwoFaData} />
    )

    expect(getByTestId('step-1')).toBeInTheDocument()
  })

  it('renders Step2Scan if activeStep is 1', () => {
    const { getByTestId } = render(
      <ActiveStep index={1} nextStep={nextStep} twoFaData={fakeTwoFaData} />
    )

    expect(getByTestId('step-2')).toBeInTheDocument()
  })

  it('renders Step3Backup if activeStep is 2', () => {
    const { getByTestId } = render(
      <ActiveStep index={2} nextStep={nextStep} twoFaData={fakeTwoFaData} />
    )

    expect(getByTestId('step-3')).toBeInTheDocument()
  })

  it('renders Step4Enable if activeStep is 3', () => {
    const { getByTestId } = render(
      <ActiveStep index={3} nextStep={nextStep} twoFaData={fakeTwoFaData} />
    )

    expect(getByTestId('step-4')).toBeInTheDocument()
  })

  it("renders Enabled if activeStep doesn't match", () => {
    const { getByTestId } = render(
      <ActiveStep index={4} nextStep={nextStep} twoFaData={fakeTwoFaData} />
    )

    expect(getByTestId('step-5')).toBeInTheDocument()
  })
})
