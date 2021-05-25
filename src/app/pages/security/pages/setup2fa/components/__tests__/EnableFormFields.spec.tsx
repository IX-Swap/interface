import { EnableFormFields } from 'app/pages/security/pages/setup2fa/components/EnableFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render, cleanup } from 'test-utils'
import { TypedField } from 'components/form/TypedField'

jest.mock('__tests__/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('EnableFormFields', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without errors', () => {
    render(
      <Form>
        <EnableFormFields />
      </Form>
    )
  })

  it('renders otp field correctly', () => {
    render(
      <Form defaultValues={{ opt: '123456' }}>
        <EnableFormFields />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'otp',
        label: ''
      }),
      {}
    )
  })
})
