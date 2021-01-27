import React from 'react'
import { render, cleanup } from 'test-utils'
import { PasswordField } from 'components/form/PasswordField'
import { Form } from 'components/form/Form'
import { PasswordValidationDisplay } from 'components/form/PasswordValidationDispay'

jest.mock('components/form/PasswordValidationDispay', () => ({
  PasswordValidationDisplay: jest.fn(() => null)
}))

describe('PasswordField', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PasswordField />
      </Form>
    )
  })

  it('renders components correctly', () => {
    const { rerender } = render(
      <Form>
        <PasswordField />
      </Form>
    )

    expect(PasswordValidationDisplay).not.toHaveBeenCalled()

    rerender(
      <Form>
        <PasswordField showErrors />
      </Form>
    )
    expect(PasswordValidationDisplay).toHaveBeenCalled()
  })
})
