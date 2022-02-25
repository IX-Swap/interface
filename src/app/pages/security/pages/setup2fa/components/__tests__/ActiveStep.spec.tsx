import React from 'react'
import { render } from 'test-utils'
import { ActiveStep } from 'app/pages/security/pages/setup2fa/components/ActiveStep'
import { fakeTwoFaData } from '__fixtures__/security'

jest.mock('app/pages/security/pages/setup2fa/components/Step1Download', () => ({
  Step1Download: jest.fn(() => <div data-testid='step-1' />)
}))
jest.mock(
  'app/pages/security/pages/setup2fa/components/Step2Scan/Step2Scan',
  () => ({
    Step2Scan: jest.fn(() => <div data-testid='step-2' />)
  })
)
jest.mock(
  'app/pages/security/pages/setup2fa/components/Step3Backup/Step3Backup',
  () => ({
    Step3Backup: jest.fn(() => <div data-testid='step-3' />)
  })
)
jest.mock('app/pages/security/components/Step4Enable', () => ({
  Step4Enable: jest.fn(() => <div data-testid='step-4' />)
}))
jest.mock('app/pages/security/pages/setup2fa/components/Enabled', () => ({
  Enabled: jest.fn(() => <div data-testid='step-5' />)
}))

describe('ActiveStep', () => {
  const props = {
    index: 0,
    nextStep: jest.fn(),
    twoFaData: fakeTwoFaData
  }

  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders all steps correctly', () => {
    const { getByTestId, rerender } = render(<ActiveStep {...props} />)

    expect(getByTestId('step-1')).toBeInTheDocument()

    rerender(<ActiveStep {...{ ...props, index: 1 }} />)

    expect(getByTestId('step-2')).toBeInTheDocument()

    rerender(<ActiveStep {...{ ...props, index: 2 }} />)

    expect(getByTestId('step-3')).toBeInTheDocument()

    rerender(<ActiveStep {...{ ...props, index: 3 }} />)

    expect(getByTestId('step-4')).toBeInTheDocument()

    rerender(<ActiveStep {...{ ...props, index: 4 }} />)

    expect(getByTestId('step-5')).toBeInTheDocument()
  })
})
