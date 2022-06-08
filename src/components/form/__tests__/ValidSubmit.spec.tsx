import * as React from 'react'
import * as useFormContext from 'react-hook-form'
import { render } from 'test-utils'
import { ValidSubmit } from 'components/form/ValidSubmit'
import { Submit } from '../Submit'

jest.mock('components/form/Submit', () => ({
  Submit: jest.fn(() => null)
}))

describe('ValidSubmit', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })
  it('opens dialog when the button is clicked', async () => {
    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => ({ formState: { isValid: false } } as any))

    render(<ValidSubmit />)
    expect(Submit).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: true
      }),
      {}
    )
  })
})
