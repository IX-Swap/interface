import React from 'react'
import { render } from 'test-utils'
import { RegisterFields } from 'auth/pages/register/components/RegisterFields'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('RegistetFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders name, email and password fields', () => {
    render(
      <Form>
        <RegisterFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'name',
        label: 'Full Name'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        name: 'email',
        label: 'Email Address'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        name: 'password',
        label: 'Password'
      }),
      {}
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        name: 'agree'
      }),
      {}
    )
  })
})
