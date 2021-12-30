import React from 'react'
import { render } from 'test-utils'
import { ChangePassword } from 'app/pages/security/pages/changePassword/ChangePassword'
import { Submit } from 'components/form/Submit'
import { Form } from 'components/form/Form'
import { ChangePasswordFields } from 'app/pages/security/pages/changePassword/components/ChangePasswordFields'

jest.mock('components/form/Submit', () => ({ Submit: jest.fn(() => null) }))

jest.mock('components/form/Form', () => ({
  Form: jest.fn(({ children }) => children)
}))

jest.mock(
  'app/pages/security/pages/changePassword/components/ChangePasswordFields',
  () => ({ ChangePasswordFields: jest.fn(() => null) })
)

describe('ChangePassword', () => {
  afterEach(async () => {
    jest.clearAllMocks()
  })

  it.skip('renders without error', () => {
    render(<ChangePassword />)
  })

  it('renders Form & Submit', () => {
    render(<ChangePassword />)

    expect(Form).toHaveBeenCalled()
    expect(Submit).toHaveBeenCalled()
    expect(ChangePasswordFields).toHaveBeenCalled()
  })
})
