import { EnableFormFields } from 'app/pages/security/components/EnableFormFields'
import { Form } from 'components/form/Form'
import React from 'react'
import { render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('EnableFormFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it('renders otp field correctly', () => {
    render(
      <Form defaultValues={{ otp: '123456' }}>
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
