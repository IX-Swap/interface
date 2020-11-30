import React from 'react'
import { render, cleanup } from 'test-utils'
import { ChangePassword } from 'v2/app/pages/security/pages/changePassword/ChangePassword'
import { Submit } from 'v2/components/form/Submit'
import { Form } from 'v2/components/form/Form'
import { ChangePasswordFields } from 'v2/app/pages/security/pages/changePassword/components/ChangePasswordFields'

jest.mock('v2/components/form/Submit', () => ({ Submit: jest.fn(() => null) }))

jest.mock('v2/components/form/Form', () => ({
  Form: jest.fn(({ children }) => children)
}))

jest.mock(
  'v2/app/pages/security/pages/changePassword/components/ChangePasswordFields',
  () => ({ ChangePasswordFields: jest.fn(() => null) })
)

describe('ChangePassword', () => {
  afterEach(async () => {
    await cleanup()
    jest.clearAllMocks()
  })

  it('renders without error', () => {
    render(<ChangePassword />)
  })

  it('renders Form & Submit', () => {
    render(<ChangePassword />)

    expect(Form).toHaveBeenCalled()
    expect(Submit).toHaveBeenCalled()
    expect(ChangePasswordFields).toHaveBeenCalled()
  })
})
