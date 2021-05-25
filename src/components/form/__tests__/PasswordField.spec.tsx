import React from 'react'
import { render, cleanup } from 'test-utils'
import { PasswordField } from 'components/form/PasswordField'
import { Form } from 'components/form/Form'
import { PasswordValidation } from 'components/form/PasswordValidation'

jest.mock('components/form/PasswordValidation', () => ({
  PasswordValidation: jest.fn(() => null)
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

  it('renders __tests__ correctly', () => {
    const { rerender } = render(
      <Form>
        <PasswordField />
      </Form>
    )

    expect(PasswordValidation).not.toHaveBeenCalled()

    rerender(
      <Form>
        <PasswordField showErrors />
      </Form>
    )
    expect(PasswordValidation).toHaveBeenCalled()
  })
})
