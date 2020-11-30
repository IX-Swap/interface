import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step1Download } from '../components/Step1Download'
import { Step2Scan } from '../components/Step2Scan'
import { Step3Backup } from '../components/Step3Backup'
import { Step4Enable } from '../components/Step4Enable'
import * as setupContext from '../context'
import { Setup2fa } from 'app/pages/security/pages/setup2fa/Setup2fa'
import { waitFor, fireEvent } from '@testing-library/react'
import { Setup2faStore } from '../context/store'

jest.mock('../components/Step1Download', () => ({
  Step1Download: jest.fn(() => null)
}))
jest.mock('../components/Step2Scan', () => ({
  Step2Scan: jest.fn(() => null)
}))
jest.mock('../components/Step3Backup', () => ({
  Step3Backup: jest.fn(() => null)
}))
jest.mock('../components/Step4Enable', () => ({
  Step4Enable: jest.fn(() => null)
}))

describe('Setup2fa', () => {
  const baseContext: Setup2faStore = {
    activeStep: 0,
    image: '',
    key: '',
    encoded: '',
    setActiveStep: jest.fn(),
    nextPage: jest.fn(),
    prevPage: jest.fn(),
    set2faData: jest.fn(),
    steps: [
      'Download app',
      'Scan QR Code',
      'Backup Key',
      'Enable Google Authenticator'
    ]
  }

  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Setup2fa />)
  })

  it('renders Step1Download if activeStep is 0', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 0
    })

    render(<Setup2fa />)

    expect(Step1Download).toHaveBeenCalledTimes(1)
  })

  it('renders Step2Scan if activeStep is 1', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 1
    })

    render(<Setup2fa />)

    expect(Step2Scan).toHaveBeenCalledTimes(1)
  })

  it('renders Step3Backup if activeStep is 2', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 2
    })

    render(<Setup2fa />)

    expect(Step3Backup).toHaveBeenCalledTimes(1)
  })

  it('renders Step4Enable if activeStep is 3', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 3
    })

    render(<Setup2fa />)

    expect(Step4Enable).toHaveBeenCalledTimes(1)
  })

  it("renders Step1Download if activeStep doesn't match", () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 8
    })

    render(<Setup2fa />)

    expect(Step1Download).toHaveBeenCalledTimes(1)
  })

  it('renders Next button if step is not last', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 0
    })

    const { queryByRole } = render(<Setup2fa />)

    const nextButton = queryByRole('button')
    expect(nextButton).not.toBeNull()
  })

  it('does not render Next button if step is last', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: baseContext.steps.length - 1
    })

    const { queryByRole } = render(<Setup2fa />)

    const nextButton = queryByRole('button')
    expect(nextButton).toBeNull()
  })

  it('invokes nextPage when Next button is clicked', async () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      ...baseContext,
      activeStep: 0
    })

    const { getByRole } = render(<Setup2fa />)

    const nextButton = getByRole('button')
    fireEvent.click(nextButton)
    await waitFor(() => {
      expect(baseContext.nextPage).toHaveBeenCalledTimes(1)
    })
  })
})
