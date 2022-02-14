import React from 'react'
import { render } from 'test-utils'
import { PasswordField } from 'components/form/PasswordField'
import { Form } from 'components/form/Form'
import { PasswordValidation } from 'components/form/PasswordValidation'

jest.mock('components/form/PasswordValidation', () => ({
  PasswordValidation: jest.fn(() => null)
}))

describe('PasswordField', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders components correctly', () => {
    const { rerender } = render(
      <Form>
        <PasswordField />
      </Form>
    )

    expect(PasswordValidation).not.toHaveBeenCalled()

    rerender(
      <Form>
        <PasswordField withPasswordValidation />
      </Form>
    )
    expect(PasswordValidation).toHaveBeenCalled()
  })
})
