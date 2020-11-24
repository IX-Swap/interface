import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'v2/components/form/TypedField'
import { Form } from 'v2/components/form/Form'
import { RequestFields } from 'v2/auth/pages/password-reset/components/RequestFields'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

describe('RequestFields', () => {
  afterEach(async () => {
    jest.clearAllMocks()
    await cleanup()
  })

  it('renders without error', () => {
    render(
      <Form>
        <RequestFields />
      </Form>
    )
  })

  it('renders email field', () => {
    render(
      <Form>
        <RequestFields />
      </Form>
    )

    expect(TypedField).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        name: 'email',
        label: 'Email Address'
      }),
      {}
    )
  })
})
