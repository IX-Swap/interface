import React from 'react'
import { cleanup, render } from 'test-utils'
import { TypedField } from 'components/form/TypedField'
import { Form } from 'components/form/Form'
import { RequestFields } from 'auth/pages/password-reset/components/RequestFields'

jest.mock('__tests__/form/TypedField', () => ({
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
