import React from 'react'
import { render } from 'test-utils'
import { Stepper } from 'ui/Stepper/Stepper'
import { StepButton } from 'ui/Stepper/StepButton'
import { DSOForm } from '../DSOForm'

jest.mock('ui/Stepper/Stepper', () => ({
  Stepper: jest.fn(() => null)
}))

jest.mock('app/components/DSO/DSODraftButton', () => ({
  SaveDraftButton: jest.fn(() => null)
}))

describe('DSO Stepper Progress', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders the Stepper component', () => {
    render(<DSOForm />)
    expect(Stepper).toHaveBeenCalledTimes(2)
  })
})
