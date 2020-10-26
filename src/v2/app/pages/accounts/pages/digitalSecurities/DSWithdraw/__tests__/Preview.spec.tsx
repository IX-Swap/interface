/**  * @jest-environment jsdom-sixteen  */
import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Summary } from 'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { Form } from 'v2/components/form/Form'
import { TypedField } from 'v2/components/form/TypedField'
import { Submit } from 'v2/components/form/Submit'

jest.mock('v2/components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('v2/components/form/Submit', () => ({ Submit: jest.fn(() => null) }))

jest.mock(
  'v2/app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary',
  () => ({ Summary: jest.fn(() => null) })
)

describe('Preview', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(
      <Form>
        <Preview />
      </Form>
    )
  })

  it('renders TextField & Submit', () => {
    render(
      <Form>
        <Preview />
      </Form>
    )

    expect(TypedField).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'otp',
        label: '2-Factor Auth Code'
      }),
      {}
    )
    expect(Submit).toHaveBeenCalledTimes(1)
  })

  it('renders Summary', () => {
    render(
      <Form>
        <Preview />
      </Form>
    )

    expect(Summary).toHaveBeenCalledTimes(1)
  })
})
