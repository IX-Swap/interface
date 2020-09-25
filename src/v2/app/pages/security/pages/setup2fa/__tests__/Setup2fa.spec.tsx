/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Step1Download } from '../components/Step1Download'
import { Step2Scan } from '../components/Step2Scan'
import { Step3Backup } from '../components/Step3Backup'
import { Step4Enable } from '../components/Step4Enable'
import * as setupContext from '../context'
import { Setup2fa } from 'v2/app/pages/security/pages/setup2fa/Setup2fa'

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
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<Setup2fa />)
  })

  it('renders Step1Download if activeStep is 0', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      activeStep: 0,
      setActiveStep: jest.fn(),
      nextPage: jest.fn(),
      steps: ['a', 'b', 'c', 'd']
    })

    render(<Setup2fa />)

    expect(Step1Download).toHaveBeenCalledTimes(1)
  })

  it('renders Step2Scan if activeStep is 1', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      activeStep: 1,
      setActiveStep: jest.fn(),
      nextPage: jest.fn(),
      steps: ['a', 'b', 'c', 'd']
    })

    render(<Setup2fa />)

    expect(Step2Scan).toHaveBeenCalledTimes(1)
  })

  it('renders Step3Backup if activeStep is 2', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      activeStep: 2,
      setActiveStep: jest.fn(),
      nextPage: jest.fn(),
      steps: ['a', 'b', 'c', 'd']
    })

    render(<Setup2fa />)

    expect(Step3Backup).toHaveBeenCalledTimes(1)
  })

  it('renders Step4Enable if activeStep is 3', () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      activeStep: 3,
      setActiveStep: jest.fn(),
      nextPage: jest.fn(),
      steps: ['a', 'b', 'c', 'd']
    })

    render(<Setup2fa />)

    expect(Step4Enable).toHaveBeenCalledTimes(1)
  })

  it("renders Step1Download if activeStep doesn't match", () => {
    jest.spyOn(setupContext, 'useSetup2faStore').mockReturnValue({
      activeStep: 8,
      setActiveStep: jest.fn(),
      nextPage: jest.fn(),
      steps: ['a', 'b', 'c', 'd']
    })

    render(<Setup2fa />)

    expect(Step1Download).toHaveBeenCalledTimes(1)
  })
})
