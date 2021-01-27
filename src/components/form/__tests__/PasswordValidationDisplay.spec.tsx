import React from 'react'
import { render, cleanup } from 'test-utils'
import { PasswordValidationDisplay } from 'components/form/PasswordValidationDispay'
import { Form } from 'components/form/Form'
import * as useFormContext from 'react-hook-form'

describe('PasswordValidationDisplay', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <PasswordValidationDisplay />
      </Form>
    )
  })

  it('renders correct component when password has no value', () => {
    const { getByText } = render(
      <Form>
        <PasswordValidationDisplay />
      </Form>
    )

    expect(
      getByText(
        'Must have 12 characters, an uppercase, a special character, and a number.'
      )
    ).toBeTruthy()
  })

  it('renders null when password has value but no errors', () => {
    const { container } = render(
      <Form defaultValues={{ password: 'password' }}>
        <PasswordValidationDisplay />
      </Form>
    )

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('renders components correctly when password has value and has errors', () => {
    const objResponse = {
      watch: () => ({ password: 'password' }),
      errors: {
        password: {
          types: {
            min: '',
            uppercase: '',
            'special-characters': '',
            numerical: ''
          }
        }
      }
    }

    jest
      .spyOn(useFormContext, 'useFormContext')
      .mockImplementation(() => objResponse as any)

    const { getByText } = render(
      <Form>
        <PasswordValidationDisplay />
      </Form>
    )

    expect(getByText(/at least 12 characters/i)).toBeTruthy()
    expect(getByText(/at least 1 uppercase/i)).toBeTruthy()
    expect(getByText(/at least 1 symbol/i)).toBeTruthy()
    expect(getByText(/at least 1 number/i)).toBeTruthy()
  })
})
