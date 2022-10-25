import React from 'react'
import { render } from 'test-utils'
import { Stepper } from 'ui/Stepper/Stepper'
import { DSOForm } from '../DSOForm'

jest.mock('ui/Stepper/Stepper', () => ({
  Stepper: jest.fn(() => null)
}))

describe('DSO Stepper Progress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders the Stepper component', () => {
    render(<DSOForm />)
    expect(Stepper).toHaveBeenCalledTimes(2)
  })

  it('renders the Stepper component with props', () => {
    render(<DSOForm />)
    expect(Stepper).toHaveBeenCalledWith(
      expect.objectContaining({
        nonLinear: true,
        activeStep: 0,
        title: 'Progress',
        stepInfo: {
          label: 'DSO Information',
          activeStep: 1,
          totalSteps: 3
        }
      }),
      {}
    )
  })
})
