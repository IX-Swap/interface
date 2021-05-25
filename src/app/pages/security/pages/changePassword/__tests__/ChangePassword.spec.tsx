import React from 'react'
import { render, cleanup } from 'test-utils'
import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { Submit } from 'components/form/Submit'
import { Form } from 'components/form/Form'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'

jest.mock('__tests__/form/Submit', () => ({ Submit: jest.fn(() => null) }))

jest.mock('__tests__/form/Form', () => ({
  Form: jest.fn(({ children }) => children)
}))

jest.mock(
  'app/pages/security/pages/changePassword/__tests__/ChangePasswordFields',
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
