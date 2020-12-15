import React from 'react'
import { render, cleanup } from 'test-utils'
import { Preview } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Preview'
import { Summary } from 'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary'
import { Form } from 'components/form/Form'
import { TypedField } from 'components/form/TypedField'
import { Submit } from 'components/form/Submit'

jest.mock('components/form/TypedField', () => ({
  TypedField: jest.fn(() => null)
}))

jest.mock('components/form/Submit', () => ({ Submit: jest.fn(() => null) }))

jest.mock(
  'app/pages/accounts/pages/digitalSecurities/DSWithdraw/Summary',
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
